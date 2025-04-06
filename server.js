import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'moduleData.json');

// Endpoint to get modules
app.get('/api/modules', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.send(JSON.parse(data));
  });
});

// Endpoint to update modules
app.post('/api/modules', (req, res) => {
  const newData = req.body;
  fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).send('Error writing data');
    }
    res.send('Data updated successfully');
  });
});

// Endpoint to get a single module
app.get('/api/modules/:moduleId', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    const modules = JSON.parse(data).modules;
    const module = modules.find(m => m.id === req.params.moduleId);
    if (!module) {
      return res.status(404).send('Module not found');
    }
    res.send(module);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});