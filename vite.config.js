import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Load .env file for local development
dotenv.config();

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  plugins: [
    {
      name: 'vercel-api-proxy',
      configureServer(server) {
        server.middlewares.use('/api/gemini', async (req, res) => {
          try {
            // Import dynamically so changes to the api handler take effect
            const handlerModule = await server.ssrLoadModule('/api/gemini.js');
            await handlerModule.default(req, res);
          } catch (e) {
            console.error('Error in local API proxy:', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Local Proxy Error' }));
          }
        });
      }
    }
  ]
});
