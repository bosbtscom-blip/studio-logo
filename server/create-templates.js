const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'templates');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const templates = {
  'tshirt.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#e8e8ed"/><path d="M200,180 L280,140 Q320,120 360,140 L440,140 Q480,120 520,140 L600,180 L640,280 L560,320 L560,720 L240,720 L240,320 L160,280 Z" fill="#ffffff" stroke="#d0d0d8" stroke-width="3"/></svg>`,
  'card.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="#f0f0f5"/><rect x="100" y="80" width="600" height="340" rx="12" fill="#ffffff" stroke="#d0d0d8" stroke-width="2"/><rect x="100" y="80" width="600" height="40" rx="12" fill="#7c5cff"/></svg>`,
  'mug.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#f4f4f8"/><rect x="220" y="200" width="320" height="400" rx="20" fill="#ffffff" stroke="#c0c0c8" stroke-width="3"/><path d="M540,280 Q640,280 640,400 Q640,520 540,520" fill="none" stroke="#c0c0c8" stroke-width="20"/></svg>`,
  'tote.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#f0e6d8"/><path d="M250,220 L250,180 Q250,120 320,120 L480,120 Q550,120 550,180 L550,220" fill="none" stroke="#b8a888" stroke-width="12"/><rect x="200" y="220" width="400" height="450" fill="#faf6ee" stroke="#d0c0a8" stroke-width="3"/></svg>`,
  'header.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400"><rect width="1200" height="400" fill="#ffffff"/><line x1="0" y1="60" x2="1200" y2="60" stroke="#e0e0e8" stroke-width="1"/><circle cx="60" cy="30" r="15" fill="#7c5cff"/><rect x="90" y="22" width="100" height="16" rx="4" fill="#e0e0e8"/></svg>`,
  'avatar.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="#e8e8f0"/><circle cx="200" cy="200" r="180" fill="#ffffff"/></svg>`,
  'linkedin.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="396" viewBox="0 0 1584 396"><rect width="1584" height="396" fill="#dfe8f5"/><rect x="200" y="100" width="1184" height="196" rx="16" fill="#ffffff"/></svg>`,
  'appicon.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#00d4a0"/></linearGradient></defs><rect width="1024" height="1024" rx="220" fill="url(#g)"/></svg>`,
  'packaging.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#f4f0e8"/><rect x="250" y="180" width="300" height="480" fill="#ffffff" stroke="#c8b8a0" stroke-width="3"/><rect x="250" y="180" width="300" height="60" fill="#e8dcc8"/></svg>`,
  'enseigne.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#1a1a22"/><rect x="100" y="300" width="600" height="200" fill="#ffffff"/><line x1="100" y1="500" x2="700" y2="500" stroke="#00d4a0" stroke-width="4"/></svg>`
};

for (const [name, content] of Object.entries(templates)) {
  fs.writeFileSync(path.join(dir, name), content);
}
console.log('✅ Les 10 templates SVG ont été créés dans le dossier templates !');