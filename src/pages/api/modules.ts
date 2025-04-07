import type { NextApiRequest, NextApiResponse } from 'next';
import { put, list } from '@vercel/blob';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Get data from Blob storage
      const { blobs } = await list({ prefix: 'moduleData.json' });
      
      if (blobs.length === 0) {
        return res.status(200).json({ modules: [] });
      }
      
      const response = await fetch(blobs[0].url);
      const text = await response.text();
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error reading data:', error);
      return res.status(500).json({ error: 'Failed to read data' });
    }
  }

  if (req.method === 'POST') {
    try {
      // Save data to Blob storage
      const data = req.body;
      const jsonString = JSON.stringify(data);
      
      await put('moduleData.json', jsonString, {
        contentType: 'application/json',
        access: 'public',
      });
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error writing data:', error);
      return res.status(500).json({ error: 'Failed to write data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}