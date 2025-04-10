import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs-extra';

// Ensure data directory exists in dist
const ensureDataDir = () => {
  const srcDataDir = path.resolve(__dirname, 'src/data');
  const distDataDir = path.resolve(__dirname, 'dist/data');
  
  if (fs.existsSync(srcDataDir)) {
    fs.ensureDirSync(distDataDir);
    fs.copySync(srcDataDir, distDataDir);
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'copy-data',
      closeBundle() {
        ensureDataDir();
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
