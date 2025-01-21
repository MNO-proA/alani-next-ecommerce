import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mediaUrls: [{ type: String, required: true }],
  buttonText: { type: String},
  buttonLink: { type: String},
  type: { 
    type: String, 
    required: true,
    enum: ['image', 'video']
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  order: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true
});

export const Feature = mongoose.models?.Feature || mongoose.model('Feature', featureSchema);