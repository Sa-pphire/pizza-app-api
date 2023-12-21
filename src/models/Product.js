import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 60 },
  desc: { type: String, required: true, maxlength: 250 },
  img: { type: String, required: true},
  price: { type: Number, required: true, maxlength: 60 },
  extraOptons: { type: [{
    text: {type: String, required: true},
    price: {type: Number, require: true}
  }], required: true, maxlength: 60 },
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
