// This is a placeholder for auth API routes
// We're using our custom JWT authentication system
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // This is a placeholder route to satisfy the file structure
  // Our authentication is handled via our custom API client
  res.status(404).json({ error: 'Auth endpoint not implemented' });
}

export const config = {
  api: {
    bodyParser: false,
  },
};