// // import { Feature } from "@/models/Feature";
// // import { mongooseConnect } from "@/lib/mongoose";
// // import { NextResponse } from "next/server";

// // export async function GET(request, { params }) {
// //   try {
// //     await mongooseConnect();
// //     const feature = await Feature.findById(params.id);
    
// //     if (!feature) {
// //       return NextResponse.json({ error: 'Feature not found' }, { status: 404 });
// //     }
    
// //     return NextResponse.json(feature);
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
// //   }
// // }

// // export async function PUT(request, { params }) {
// //   try {
// //     await mongooseConnect();
// //     const body = await request.json();
// //     const { title, description, mediaUrls, buttonText, buttonLink, type, isActive } = body;

// //     const feature = await Feature.findByIdAndUpdate(
// //       params.id,
// //       {
// //         title,
// //         description,
// //         mediaUrls,
// //         buttonText,
// //         buttonLink,
// //         type,
// //         isActive
// //       },
// //       { new: true }
// //     );

// //     if (!feature) {
// //       return NextResponse.json({ error: 'Feature not found' }, { status: 404 });
// //     }

// //     return NextResponse.json(feature);
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
// //   }
// // }

// // export async function PATCH(request, { params }) {
// //   try {
// //     await mongooseConnect();
// //     const body = await request.json();
    
// //     const feature = await Feature.findById(params.id);
// //     if (!feature) {
// //       return NextResponse.json({ error: 'Feature not found' }, { status: 404 });
// //     }

// //     if (body.hasOwnProperty('isActive')) {
// //       feature.isActive = body.isActive;
// //     }

// //     if (body.hasOwnProperty('order')) {
// //       const direction = body.order > feature.order ? 'down' : 'up';
// //       const otherFeature = await Feature.findOne({
// //         type: feature.type,
// //         order: body.order
// //       });

// //       if (otherFeature) {
// //         otherFeature.order = feature.order;
// //         await otherFeature.save();
// //       }
      
// //       feature.order = body.order;
// //     }

// //     await feature.save();
// //     return NextResponse.json(feature);
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
// //   }
// // }

// // export async function DELETE(request, { params }) {
// //   try {
// //     await mongooseConnect();
// //     const feature = await Feature.findById(params.id);
    
// //     if (!feature) {
// //       return NextResponse.json({ error: 'Feature not found' }, { status: 404 });
// //     }

// //     await Feature.deleteOne({ _id: params.id });

// //     // Reorder remaining features
// //     await Feature.updateMany(
// //       { type: feature.type, order: { $gt: feature.order } },
// //       { $inc: { order: -1 } }
// //     );

// //     return NextResponse.json({ message: 'Feature deleted successfully' });
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
// //   }
// // }

// // pages/api/features/[id].js
// import { Feature } from "@/models/Feature";
// import { mongooseConnect } from "@/lib/mongoose";

// export default async function handler(req, res) {
//   const { method } = req;
//   const { id } = req.query;

//   await mongooseConnect();

//   switch (method) {
//     case 'GET':
//       try {
//         const feature = await Feature.findById(id);
//         if (!feature) {
//           return res.status(404).json({ error: 'Feature not found' });
//         }
//         res.status(200).json(feature);
//       } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//       break;

//     case 'PUT':
//       try {
//         const feature = await Feature.findByIdAndUpdate(id, req.body, {
//           new: true,
//           runValidators: true
//         });
//         if (!feature) {
//           return res.status(404).json({ error: 'Feature not found' });
//         }
//         res.status(200).json(feature);
//       } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//       break;

//     case 'DELETE':
//       try {
//         const feature = await Feature.findByIdAndDelete(id);
//         if (!feature) {
//           return res.status(404).json({ error: 'Feature not found' });
//         }
//         res.status(200).json({ message: 'Feature deleted successfully' });
//       } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//       res.status(405).json({ error: `Method ${method} Not Allowed` });
//   }
// }

import { Feature } from "@/models/Feature";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await mongooseConnect();

  switch (method) {
    case 'GET':
      try {
        const feature = await Feature.findById(id);
        if (!feature) {
          return res.status(404).json({ error: 'Feature not found' });
        }
        res.status(200).json(feature);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'PATCH':
      try {
        const feature = await Feature.findById(id);
        if (!feature) {
          return res.status(404).json({ error: 'Feature not found' });
        }

        if (req.body.hasOwnProperty('isActive')) {
          feature.isActive = req.body.isActive;
        }

        if (req.body.hasOwnProperty('order')) {
          const direction = req.body.order > feature.order ? 'down' : 'up';
          const otherFeature = await Feature.findOne({
            type: feature.type,
            order: req.body.order
          });

          if (otherFeature) {
            otherFeature.order = feature.order;
            await otherFeature.save();
          }
          
          feature.order = req.body.order;
        }

        await feature.save();
        res.status(200).json(feature);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'PUT':
      try {
        const feature = await Feature.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!feature) {
          return res.status(404).json({ error: 'Feature not found' });
        }
        res.status(200).json(feature);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'DELETE':
      try {
        const feature = await Feature.findByIdAndDelete(id);
        if (!feature) {
          return res.status(404).json({ error: 'Feature not found' });
        }
        res.status(200).json({ message: 'Feature deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}