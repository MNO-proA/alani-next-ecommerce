import {model, models, Schema} from "mongoose";


const OrderSchema = new Schema(
  {
    cart_items: [
      {
        _id: String,
        title: String,
        quantity: Number,
        price: Number,
      },
    ],
    name: String,
    email: String,
    city: String,
    gps: String,
    phone: String,
    address: String,
    totalAmount: Number,
    totalQty: Number,
    orderReference: String,
    paymentReference: String,
    paymentMethod: String,
    paid: Boolean,
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    paymentData: {
      transactionId: String,
      amountPaid: Number,
      paymentMethod: String,
      paidAt: Date,
      currency: String,
      gatewayResponse: String
    }
    
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);



// In your Order model
// {
//   // ... existing fields ...
//   paymentReference: { type: String },
//   paymentStatus: { 
//     type: String, 
//     enum: ['pending', 'completed', 'failed'],
//     default: 'pending'
//   },
//   paymentData: {
//     transactionId: String,
//     amountPaid: Number,
//     paymentMethod: String,
//     paidAt: Date,
//     currency: String,
//     gatewayResponse: String
//   }
// }