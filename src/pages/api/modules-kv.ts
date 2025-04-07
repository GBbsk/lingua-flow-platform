import type { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';
import { Module } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET request - read from KV storage
  if (req.method === 'GET') {
    try {
      const data = await kv.get('moduleData');
      return res.status(200).json(data || { modules: [] });
    } catch (error) {
      console.error('Error reading data:', error);
      return res.status(500).json({ error: 'Failed to read data' });
    }
  }

  // POST request - write to KV storage
  if (req.method === 'POST') {
    try {
      const data = req.body;
      await kv.set('moduleData', data);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error writing data:', error);
      return res.status(500).json({ error: 'Failed to write data' });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}