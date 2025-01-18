// uploadActions.js
"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { mongooseConnect } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import mime from "mime-types";

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;
const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export async function uploadImagesToS3(formData) {
  try {
    await mongooseConnect();
    const files = formData.getAll("file");
    const uploadPromises = [];
    const links = [];

    for (const file of files) {
      if (!file) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = file.name.split(".").pop();
      const newFilename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

      const uploadParams = {
        Bucket: bucketName,
        Key: newFilename,
        Body: buffer,
        ACL: "public-read",
        ContentType: mime.lookup(file.name) || "application/octet-stream",
      };

      uploadPromises.push(
        s3Client
          .send(new PutObjectCommand(uploadParams))
          .then(() => {
            const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
            links.push(link);
          })
          .catch((err) => {
            console.error(`Error uploading ${file.name}:`, err);
            throw new Error(`Failed to upload ${file.name}`);
          })
      );
    }

    await Promise.all(uploadPromises);
    // revalidatePath("/"); // Adjust the path as needed
    console.log(links)
    return { success: true, links };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: error.message };
  }
}


// uploadActions.js
// "use server";

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { mongooseConnect} from "@/lib/uploadMongoConnection";
// import { revalidatePath } from "next/cache";
// import mime from "mime-types";

// const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;
// const s3Client = new S3Client({
//   region: "us-east-1",
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   },
// });

// export async function uploadChunk(chunk, filename, contentType) {
//   try {
//     await mongooseConnect();

//     const uploadParams = {
//       Bucket: bucketName,
//       Key: filename,
//       Body: chunk,
//       ACL: "public-read",
//       ContentType: contentType,
//     };

//     await s3Client.send(new PutObjectCommand(uploadParams));
//     const link = `https://${bucketName}.s3.amazonaws.com/${filename}`;
    
//     revalidatePath("/");
//     return { success: true, link };
//   } catch (error) {
//     console.error("Upload chunk error:", error);
//     return { success: false, error: error.message };
//   }
// }