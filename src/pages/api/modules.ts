import { NextApiRequest, NextApiResponse } from 'next';
import { Module, Lesson } from '@/types';
import path from 'path';
import { promises as fs } from 'fs';

const MODULE_DATA_PATH = path.join(process.cwd(), 'public', 'data', 'moduleData.json');

async function readModuleData() {
  try {
    const data = await fs.readFile(MODULE_DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading module data:', error);
    return { modules: [] };
  }
}

async function writeModuleData(data: { modules: Module[] }) {
  try {
    await fs.writeFile(MODULE_DATA_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing module data:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { moduleId, lessonId } = query;

  try {
    switch (method) {
      case 'GET':
        const data = await readModuleData();
        res.status(200).json(data.modules);
        break;

      case 'POST':
        if (lessonId) {
          // Handle lesson creation/update
          const data = await readModuleData();
          const moduleIndex = data.modules.findIndex(m => m.id === moduleId);
          
          if (moduleIndex === -1) {
            res.status(404).json({ error: 'Module not found' });
            return;
          }

          const lesson: Lesson = req.body;
          const lessonIndex = data.modules[moduleIndex].lessons.findIndex(l => l.id === lesson.id);

          if (lessonIndex !== -1) {
            data.modules[moduleIndex].lessons[lessonIndex] = lesson;
          } else {
            data.modules[moduleIndex].lessons.push(lesson);
          }

          await writeModuleData(data);
          res.status(200).json({ message: 'Lesson saved successfully' });
        } else {
          // Handle module creation/update
          const data = await readModuleData();
          const module: Module = req.body;
          const moduleIndex = data.modules.findIndex(m => m.id === module.id);

          if (moduleIndex !== -1) {
            data.modules[moduleIndex] = module;
          } else {
            data.modules.push(module);
          }

          await writeModuleData(data);
          res.status(200).json({ message: 'Module saved successfully' });
        }
        break;

      case 'DELETE':
        if (lessonId) {
          // Handle lesson deletion
          const data = await readModuleData();
          const moduleIndex = data.modules.findIndex(m => m.id === moduleId);

          if (moduleIndex === -1) {
            res.status(404).json({ error: 'Module not found' });
            return;
          }

          data.modules[moduleIndex].lessons = data.modules[moduleIndex].lessons.filter(
            l => l.id !== lessonId
          );

          await writeModuleData(data);
          res.status(200).json({ message: 'Lesson deleted successfully' });
        } else {
          // Handle module deletion
          const data = await readModuleData();
          data.modules = data.modules.filter(m => m.id !== moduleId);
          await writeModuleData(data);
          res.status(200).json({ message: 'Module deleted successfully' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}