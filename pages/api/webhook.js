// import {mongooseConnect} from "@/lib/mongoose";
// const stripe = require('stripe')(process.env.STRIPE_SK);
// import {buffer} from 'micro';
// import {Order} from "@/models/Order";

// const endpointSecret = "whsec_634d3142fd2755bd61adaef74ce0504bd2044848c8aac301ffdb56339a0ca78d";

// export default async function handler(req,res) {
//   await mongooseConnect();
//   const sig = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
//   } catch (err) {
//     res.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const data = event.data.object;
//       const orderId = data.metadata.orderId;
//       const paid = data.payment_status === 'paid';
//       if (orderId && paid) {
//         await Order.findByIdAndUpdate(orderId,{
//           paid:true,
//         })
//       }
//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   res.status(200).send('ok');
// }

// export const config = {
//   api: {bodyParser:false,}
// };




// // =========================================================================



// const axios = require('axios');
// const crypto = require('crypto');

// const verifyPaystackWebhook = async (req, res) => {
//   try {
//     // Compute the HMAC hash using the Paystack secret key
//     const secret = process.env.PAYSTACK_SECRET_KEY;
//     // console.log(secret)
//     if (!secret) {
//       throw new Error('Missing PAYSTACK_SECRET_KEY in environment variables');
//     }

//     const hash = crypto
//       .createHmac('sha512', secret)
//       .update(JSON.stringify(req.body))
//       .digest('hex');

//     // Validate the signature from Paystack
//     if (hash !== req.headers['x-paystack-signature']) {
//       return res.status(400).json({ message: 'Invalid signature' });
//     }

//     const event = req.body;

//     // Process only successful transactions
//     if (event.event === 'charge.success') {
//       const { data } = event;
//       const metadata = data.metadata || {};
//       const parsedMetadata =
//         typeof metadata === 'string' ? JSON.parse(metadata) : metadata;

//       console.log('Parsed metadata:', parsedMetadata);

//       switch (parsedMetadata.app_name) {
//         case 'alani-ecommerce': {
//           const webhookData = {
//             transaction: {
//               id: data.id,
//               reference: data.reference,
//               status: data.status,
//               amount: data.amount,
//               currency: data.currency,
//               paid_at: data.paid_at,
//               payment_method: data.channel,
//               gateway_response: data.gateway_response
//             },
//             customer: data.customer,
//             metadata: {
//               cart_id: parsedMetadata.cart_id,
//               user_id: parsedMetadata.user_id,
//               cart_items: parsedMetadata.cart_items,
//               address_info: parsedMetadata.address_info
//             }
//           };

//           // Extract orders lambda URL from metadata
//           const ordersLambdaUrl = parsedMetadata.orders_lambda_url;

//           if (!ordersLambdaUrl) {
//             throw new Error('Orders lambda URL not found');
//           }

//           try {
//             // Make POST request to the orders lambda
//             const response = await axios.post(ordersLambdaUrl, webhookData, {
//               headers: {
//                 'Content-Type': 'application/json'
//               }
//             });

//             console.log('Orders lambda response:', response.data);
//             console.log('E-commerce payment processed successfully');
//           } catch (error) {
//             console.error('Error calling orders lambda:', error.message);
//             // You might want to handle this error differently depending on your requirements
//             throw new Error(`Failed to notify orders lambda: ${error.message}`);
//           }

//           break;
//         }
//         default:
//           console.log('Unknown application:', parsedMetadata.app_name);
//           break;
//       }
//     }

//     res.status(200).json({ message: 'Webhook processed successfully' });

//   } catch (error) {
//     console.error('Webhook processing error:', error.message);
//     res.status(500).json({ message: 'Webhook processing failed' });
//   }
// };

// module.exports = verifyPaystackWebhook;


// import {mongooseConnect} from "@/lib/mongoose";
// import {buffer} from 'micro';
// import {Order} from "@/models/Order";
// import crypto from 'crypto';

// export default async function handler(req,res) {
//   try {
//     await mongooseConnect();

//     // Verify Paystack webhook signature
//     const hash = crypto
//       .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
//       .update(JSON.stringify(req.body))
//       .digest('hex');

//     if (hash !== req.headers['x-paystack-signature']) {
//       return res.status(400).json({ message: 'Invalid signature' });
//     }

//     const event = req.body;

//     // Handle the event
//     if (event.event === 'charge.success') {
//       const { data } = event;
//       const metadata = typeof data.metadata === 'string' 
//         ? JSON.parse(data.metadata) 
//         : data.metadata;

//       // Update order status
//       if (data.status === 'success') {
//         await Order.findOneAndUpdate(
//           { paymentReference: data.orderReference },
//           {
//             paid: true,
//             paymentStatus: 'completed',
//             paystackStatus: data.status,
//             paymentData: {
//               transactionId: data.id,
//               amountPaid: data.amount / 100, // Convert from kobo/cents to main currency
//               paymentMethod: data.channel,
//               paidAt: data.paid_at,
//               currency: data.currency,
//               gatewayResponse: data.gateway_response
//             }
//           }
//         );

//         console.log('Payment successful for order:', data.orderReference);
//       }
//     }

//     res.status(200).json({ message: 'Webhook processed successfully' });

//   } catch (error) {
//     console.error('Webhook processing error:', error);
//     res.status(500).json({ 
//       message: 'Webhook processing failed',
//       error: error.message 
//     });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: true, // Changed to true for Paystack webhook
//   }
// };

import {mongooseConnect} from "@/lib/mongoose";
import {buffer} from 'micro';
import {Order} from "@/models/Order";
import crypto from 'crypto';

export default async function handler(req,res) {
  try {
    await mongooseConnect();
    // Verify Paystack webhook signature
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');
    
    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = req.body;
    // Handle different event types
    if (event.event === 'charge.success') {
      const { data } = event;
      const metadata = typeof data.metadata === 'string'
        ? JSON.parse(data.metadata)
        : data.metadata;

        
      // Update order status for successful payment
      if (data.status === 'success') {
        await Order.findOneAndUpdate(
          { paymentReference: data.reference },
          {
            paid: true,
            paymentStatus: 'completed',
            paystackStatus: data.status,
            paymentData: {
              transactionId: data.id,
              amountPaid: data.amount / 100,
              paymentMethod: data.channel,
              paidAt: data.paid_at,
              currency: data.currency,
              gatewayResponse: data.gateway_response
            }
          }
        );
        console.log('Payment successful for order:', data.reference);
      }
    } else if (event.event === 'charge.failed') {
      const { data } = event;
      
      // Update order status for failed payment
      await Order.findOneAndUpdate(
        { paymentReference: data.reference },
        {
          paid: false,
          paymentStatus: 'failed',
          paystackStatus: data.status,
          paymentData: {
            transactionId: data.id,
            attemptedAmount: data.amount / 100,
            failureReason: data.gateway_response,
            failedAt: new Date().toISOString(),
            currency: data.currency,
            gatewayResponse: data.gateway_response
          }
        }
      );
      
      console.log('Payment failed for order:', data.reference, 'Reason:', data.gateway_response);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({
      message: 'Webhook processing failed',
      error: error.message
    });
  }
}

export const config = {
  api: {
    bodyParser: true,
  }
};