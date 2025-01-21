// import { Feature } from "@/models/Feature";
// import { mongooseConnect } from "@/lib/mongoose";

// export default async function handle(req, res) {
//   const { method } = req;

//   try {
//     await mongooseConnect();

//     if (method === 'GET') {
//       // Get all features or filter by type if specified
//       const { type } = req.query;
//       const query = type ? { type } : {};
//       const features = await Feature.find(query).sort({ order: 1 });
//       res.json(features);
//     }

//     if (method === 'POST') {
//       const { title, description, mediaUrls, buttonText, buttonLink, type } = req.body;

//       // Validation
//       if (!title || !mediaUrl || !type) {
//         return res.status(400).json({ error: 'Title, media URL, and type are required' });
//       }

//       const featureDoc = await Feature.create({
//         title,
//         description,
//         mediaUrls,
//         buttonText,
//         buttonLink,
//         type,
//         isActive: true,
//         order: 0 // Will be updated if ordering is implemented
//       });

//       res.json(featureDoc);
//     }

//     if (method === 'PUT') {
//       const { _id } = req.query;
//       const { title, description, mediaUrls, buttonText, buttonLink, type, isActive } = req.body;

//       if (!_id) {
//         return res.status(400).json({ error: 'Feature ID is required for updating' });
//       }

//       const featureDoc = await Feature.findByIdAndUpdate(_id, {
//         title,
//         description,
//         mediaUrls,
//         buttonText,
//         buttonLink,
//         type,
//         isActive
//       }, { new: true });

//       if (!featureDoc) {
//         return res.status(404).json({ error: 'Feature not found' });
//       }

//       res.json(featureDoc);
//     }

//     if (method === 'DELETE') {
//       const { _id } = req.query;

//       if (!_id) {
//         return res.status(400).json({ error: 'Feature ID is required for deletion' });
//       }

//       const result = await Feature.deleteOne({ _id });

//       if (result.deletedCount === 0) {
//         return res.status(404).json({ error: 'Feature not found' });
//       }

//       res.json({ message: 'Feature deleted successfully' });
//     }

//   } catch (error) {
//     console.error("Error in feature route:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// pages/api/features.js
import { Feature } from "@/models/Feature";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;
  
  await mongooseConnect();

  switch (method) {
    case 'GET':
      try {
        const features = await Feature.find().sort({ order: 1 });
        res.status(200).json(features);
      } catch (error) {
        console.error("Get features error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'POST':
      try {
        const { title, description, mediaUrls, buttonText, buttonLink, type } = req.body;

        // Validate required fields
        if (!title || !description) {
          return res.status(400).json({
            error: 'Missing required fields',
            requiredFields: ['title', 'description']
          });
        }

        // Get the highest order number for the specific type
        const maxOrder = await Feature.findOne({ type })
          .sort({ order: -1 })
          .select('order');

        const featureDoc = await Feature.create({
          title,
          description,
          mediaUrls,
          buttonText,
          buttonLink,
          type,
          isActive: true,
          order: maxOrder ? maxOrder.order + 1 : 0
        });

        res.status(201).json(featureDoc);
      } catch (error) {
        console.error("Create feature error:", error);
        res.status(500).json({
          error: 'Internal Server Error',
          message: error.message
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}