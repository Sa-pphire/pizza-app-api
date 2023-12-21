import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  img: { type: String, required: true, maxlength: 200 },
  author: { type: String, required: true, default: "Admin"},
  content: { type: Text, required: true},
  readTime: { type: Number, required: true, default: 0 },
  createdAt: { type: Date , required: true },
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
