import dbConnect from '../../../config/db.js';
import Product from '../../../models/Product.js';

dbConnect();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':

      try {
        const products = await Product.find();
        res.status(200).json({ 
          success: true, 
          data: products });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json({ 
          success: true, 
          data: product });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
