import dbConnect from '../../../config/db.js';
import Product from '../../../models/Product.js';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get a single product by ID
      try {
        const product = await Product.findById(req.query.id);

        if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;
    
    case 'PUT':
        // Update a single product by ID
        try {
          const product = await Product.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
          });
  
          if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
          }
  
          res.status(200).json({ success: true, data: product });
        } catch (error) {
          res.status(500).json({ success: false, error });
        }
        break;
    case 'DELETE':
        // Delete a single product by ID
        try {
          const deletedPost = await Product.findByIdAndDelete(req.query.id);
  
          if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Product not found' });
          }
  
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(500).json({ success: false, error });
        }
        break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
