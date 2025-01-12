// pages/api/cashOnDelivery.js
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    await mongooseConnect();

    const {
      name,
      email,
      phone,
      city,
      gps,
      address,
      cart_items,
      totalAmount,
      totalQty,
      paymentMethod,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !city || !address || !cart_items || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create a unique reference for the order
    const reference = `COD-${Date.now()}-${uuidv4()}`;

    // const orderData = {
    //   name,
    //   email,
    //   city,
    //   gps,
    //   phone,
    //   address,
    //   totalAmount,
    //   totalQty,
    //   cart_items,
    //   paid: false,
    //   paymentReference: reference,
    //   paymentMethod,
      
    // }
    // console.log(orderData)

    // Create the order document
    // const orderDoc = await Order.create({
    //     name,
    //     email,
    //     city,
    //     gps,
    //     phone,
    //     address,
    //     totalAmount,
    //     totalQty,
    //     cart_items,
    //     paid: false,
    //     paymentReference: reference,
    //     paymentMethod,
        
    //   });
    // Send confirmation email (you can implement this later)
    // await sendOrderConfirmationEmail(orderDoc);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Cash on delivery order created successfully',
      // data: {
      //   orderId: orderDoc._id,
      //   reference: reference,
      //   orderStatus: 'pending',
      // }
    });

  } catch (error) {
    console.error('Cash on delivery order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing cash on delivery order',
      error: error.message
    });
  }
}