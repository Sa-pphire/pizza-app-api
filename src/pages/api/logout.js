
export default async function handler(req, res) {
  req.logout();
  res.status(200).json({ success: true, message: 'Logout successful' });
}
