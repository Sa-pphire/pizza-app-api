import dbConnect from '../../../config/db.js';
import Order from '../../../models/Order.js';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get a single order by ID
      try {
        const order = await Order.findById(req.query.id);

        if (!order) {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: order });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;
    
    case 'PUT':
        // Update a single order by ID
        try {
          const order = await Order.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
          });
  
          if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
          }
  
          res.status(200).json({ success: true, data: order });
        } catch (error) {
          res.status(500).json({ success: false, error });
        }
        break;
    case 'DELETE':
        // Delete a single order by ID
        try {
          const deletedPost = await Order.findByIdAndDelete(req.query.id);
  
          if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Order not found' });
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
