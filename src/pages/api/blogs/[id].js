import dbConnect from '../../../config/db.js';
import Blog from '../../../models/Blog.js';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get a single blog by ID
      try {
        const blog = await Blog.findById(req.query.id);

        if (!blog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;
    
    case 'PUT':
        // Update a single blog by ID
        try {
          const blog = await Blog.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
          });
  
          if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
          }
  
          res.status(200).json({ success: true, data: blog });
        } catch (error) {
          res.status(500).json({ success: false, error });
        }
        break;
    case 'DELETE':
        // Delete a single blog by ID
        try {
          const deletedPost = await Blog.findByIdAndDelete(req.query.id);
  
          if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
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
