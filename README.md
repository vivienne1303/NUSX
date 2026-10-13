# NUSX Club

Five-page website: `index.html` (Home), `events.html`, `about.html`, `contact.html`, and `join.html`. Navigation and homepage calls to action open the relevant pages. The Events page includes category filters and event detail dialogs; Join includes expandable membership FAQs. Shared styles are in `styles.css` and `pages.css`; interactions are in `script.js`.

Run `npm.cmd run dev` in this folder and visit http://localhost:3000. On terminals where npm runs directly, use `npm run dev`. No dependency installation is needed. Press Ctrl+C to stop the server. Refresh the browser after editing files.

`npm.cmd run build` copies all five pages and assets to `dist/`. `npm.cmd run preview` serves that folder. `npm.cmd start` also starts the development server. If port 3000 is occupied, use `npm.cmd run dev -- --port 3001`.

Built with HTML, CSS and JavaScript; no dependencies required. Includes animated globe, continuous marquee, scroll reveals, count-up statistics, mobile navigation, event dialogs and reduced-motion support. Google Fonts is optional; system fonts work offline.

The provided 2025 events are displayed as archived events. Membership, contact and social buttons explain that official links are pending; replace these handlers in `script.js` when real URLs are available. No membership data is collected.
