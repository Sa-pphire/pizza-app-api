import dbConnect from '../../../config/db.js';
import Blog from '../../../models/Blog.js';

dbConnect();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':

      try {
        const blogs = await Blog.find();
        res.status(200).json({ 
          success: true, 
          data: blogs });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    case 'POST':
      try {
        const blog = await Blog.create(req.body);
        res.status(201).json({ 
          success: true, 
          data: blog });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
