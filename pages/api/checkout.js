import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/models/Order";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req,res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }

  try {
    const {
      name,
      email,
      phone,
      city,
      gps,
      address,
      cart_items,
      paymentMethod,
      totalAmount,
      totalQty,
    } = req.body;



    await mongooseConnect();

    // console.log(req.body)

    // Create a unique reference
    const orderReference = `ORDER-${Date.now()}-${uuidv4()}`;

    // Create metadata
    const metadata = {
      app_name: 'alani-ecommerce',
      customer_name: name,
      customer_email: email,
      delivery_address: {
        city,
        gps,
        address, 
        phone
      },
      cart_items,
      totalQty,
    };

    // Prepare Paystack payment data
    const paymentData = {
      email,
      amount: Math.round(totalAmount * 100), // Convert to smallest currency unit (kobo/cents)
      currency: 'GHS',
      reference: orderReference,
      callback_url: process.env.PUBLIC_URL + '/checkout?processing=1',
      metadata: JSON.stringify(metadata)
    };

    // Initialize Paystack transaction
    const paystackConfig = {
      method: 'post',
      url: 'https://api.paystack.co/transaction/initialize',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      },
      data: paymentData
    };
    console.log(email, typeof(email))

    console.log(Math.round(totalAmount * 100), typeof(Math.round(totalAmount * 100)))

    console.log(paymentData.reference, typeof(paymentData.reference))
   
    // console.log(orderReference)
    // console.log(metadata)

    // console.log(paymentData)


    // Create order in database
    const orderDoc = await Order.create({
      name,
      email,
      city,
      gps,
      phone,
      address,
      totalAmount,
      totalQty,
      cart_items,
      paid: false,
      orderReference,
      paymentMethod,
      
    });

    // console.log(orderDoc)

    // Initialize payment with Paystack
    const paystackResponse = await axios(paystackConfig);

    res.json({
      url: paystackResponse.data.data.authorization_url,
      reference: orderReference,
      orderId: orderDoc._id
    });

  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Error initializing payment',
      error: error.message
    });
  }
}

