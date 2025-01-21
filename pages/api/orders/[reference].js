// pages/api/orders/[reference].js
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  try {
    await mongooseConnect();
    
    const { reference } = req.query;
    
    if (!reference) {
      return res.status(400).json({ error: 'Payment reference is required' });
    }

    const order = await Order.findOne({ orderReference: reference });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      paystackStatus: order.paystackStatus,
      paymentStatus: order.paymentStatus,
      paid: order.paid,
    });

  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}