// import mongoose, {model, Schema, models} from "mongoose";
// import { Category } from './Category';

// const ProductSchema = new Schema({
//   title: {type:String, required:true},
//   description: String,
//   price: {type: Number, required: true},
//   images: [{type:String}],
//   category: {type:mongoose.Types.ObjectId, ref:'Category'},
//   properties: {type:Object},
// }, {
//   timestamps: true,
// });

// export const Product = models.Product || model('Product', ProductSchema);
// Product.js
import mongoose, {model, Schema, models} from "mongoose";
import { Category } from './Category';

const ProductSchema = new Schema({
  title: {type:String, required:true},
  description: String,
  price: {type: Number, required: true},
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: {type:Object},
  outOfStock: {type: Boolean, default: false}, 
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);