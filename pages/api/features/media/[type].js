
// // app/api/features/[type]/route.js
// import { Feature } from "@/models/Feature";
// import { mongooseConnect } from "@/lib/mongoose";
// import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   try {
//     await mongooseConnect();
//     const { type } = params;
    
//     const features = await Feature.find({ type })
//       .sort({ order: 1 });
    
//     return NextResponse.json(features);
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// pages/api/features/media/[type].js
import { Feature } from "@/models/Feature";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;
  const { type } = req.query;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }

  try {
    await mongooseConnect();
    const features = await Feature.find({ type }).sort({ order: 1 });
    res.status(200).json(features);
  } catch (error) {
    console.error("Get features by type error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
