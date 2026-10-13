import { mkdir, copyFile, cp } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'events.html', 'about.html', 'contact.html', 'join.html', 'styles.css', 'pages.css', 'theme.css', 'script.js']) {
  await copyFile(file, `dist/${file}`);
}
await cp('images', 'dist/images', { recursive: true });
console.log('Built all five pages and assets into dist/.');
