import { Schema, model } from 'mongoose';

const addressSchema = new Schema({
  type: {
    type: String,
    enum: ['home', 'office', 'other'],
    required: true
  },
  street: {
    type: String,
    required: true
  },
  apartment: String,
  area: String,
  city: {
    type: String,
    required: true
  },
  state: String,
  pincode: String,
  
  isDefault: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


export default model('Address', addressSchema);