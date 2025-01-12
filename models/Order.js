import {model, models, Schema} from "mongoose";

// const OrderSchema = new Schema({
//   cart_items:Object,
//   name:String,
//   email:String,
//   city:String,
//   gps:String,
//   phone:String,
//   address:String,
//   totalAmount:Number,
//   totalQty:Number,
//   paymentReference:String,
//   paymentMethod:String,
//   paid:Boolean,
// }, {
//   timestamps: true,
// });

// export const Order = models?.Order || model('Order', OrderSchema);

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
    paymentReference: String,
    paymentMethod: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
