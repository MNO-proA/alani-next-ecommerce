
import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import { mongooseConnect } from "@/lib/mongoose";
const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET || 'alani-next-ecommerce';

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    console.log('length:', files.file.length);

    const client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
      requestHandler: {
        requestTimeout: 5000, // 5 second timeout for requests
      },
    });

    const links = [];
    for (const file of files.file) {
      try {
        const ext = file.originalFilename.split('.').pop();
        const newFilename = Date.now() + '.' + ext;

        // Attempt to upload the file to S3
        await client.send(new PutObjectCommand({
          Bucket: bucketName,
          Key: newFilename,
          Body: fs.readFileSync(file.path),
          ACL: 'public-read',
          ContentType: mime.lookup(file.path),
        }));

        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);
      } catch (uploadError) {
        console.error(`Error uploading file: ${file.originalFilename}`, uploadError);
        return res.status(500).json({
          error: `Failed to upload file: ${file.originalFilename}. Please try again.`,
        });
      }
    }
    console.log(links, "from upload api")

    return res.json({ links });
  } catch (error) {
    console.error('Error in file upload process:', error);
    return res.status(500).json({
      error: 'There was an error processing your request. Please try again.',
    });
  }
}

export const config = {
  api: { bodyParser: false },
};