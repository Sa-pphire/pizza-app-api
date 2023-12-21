import dbConnect from '../../../config/db.js';
import Order from '../../../models/Order.js';

dbConnect();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':

      try {
        const orders = await Order.find();
        res.status(200).json({ success: true, data: orders });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    case 'POST':
      try {
        const order = await Order.create(req.body);
        res.status(201).json({ success: true, data: order });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
