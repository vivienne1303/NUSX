import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), process.argv.includes('--dist') ? 'dist' : '.');
const portFlag = process.argv.indexOf('--port');
const port = Number(portFlag >= 0 ? process.argv[portFlag + 1] : process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const server = http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
  try {
    const requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const relative = requested === '/' ? 'index.html' : requested.replace(/^\/+/, '');
    const file = path.resolve(root, relative);
    const ext = path.extname(file);
    if (!file.startsWith(root + path.sep) || relative.split(/[\\/]/).some(part => part.startsWith('.')) || !types[ext]) {
      res.writeHead(404); res.end('Not found'); return;
    }
    if (!(await stat(file)).isFile()) { res.writeHead(404); res.end('Not found'); return; }
    const content = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[ext], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch (error) {
    res.writeHead(error.code === 'ENOENT' ? 404 : 400); res.end(error.code === 'ENOENT' ? 'Not found' : 'Bad request');
  }
});
server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? `Port ${port} is already in use. Try npm.cmd run dev -- --port 3001` : error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`NUSX Club is running at http://localhost:${port}\nPress Ctrl+C to stop. Refresh your browser after editing files.`));
