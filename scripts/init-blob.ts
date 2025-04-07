import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

async function initializeBlob() {
  try {
    // Read the existing moduleData.json file
    const dataFilePath = path.join(process.cwd(), 'src', 'data', 'moduleData.json');
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    
    // Store the data in Vercel Blob
    await put('moduleData.json', fileData, {
      contentType: 'application/json',
      access: 'public', // Add the required access property
    });
    
    console.log('Successfully initialized Blob storage with module data');
  } catch (error) {
    console.error('Error initializing Blob storage:', error);
  }
}

initializeBlob();