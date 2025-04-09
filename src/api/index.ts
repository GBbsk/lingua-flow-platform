
// Create an API folder with serverless functions
import { Module } from '../types';

// Define VercelRequest and VercelResponse types to avoid needing @vercel/node
interface VercelRequest {
  method: string;
  body: any;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (key: string, value: string) => void;
  end: () => void;
}

// Sample data store (replace with actual database in production)
let modules: Module[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET request - fetch modules
  if (req.method === 'GET') {
    return res.status(200).json({ modules });
  }

  // POST request - save modules
  if (req.method === 'POST') {
    try {
      const data = req.body;
      if (data.modules) {
        modules = data.modules;
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save data' });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
