const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

async function generateMockup(logoBuffer, templateId, options = {}) {
  const templatePath = path.join(TEMPLATES_DIR, `${templateId}.svg`);
  if (!fs.existsSync(templatePath)) throw new Error(`Template "${templateId}" introuvable`);

  const templateBuffer = fs.readFileSync(templatePath);
  const metadata = await sharp(templateBuffer).metadata();
  const width = metadata.width || 800;
  const height = metadata.height || 800;

  const logoScale = options.logoScale || 0.35;
  const logoWidth = Math.round(width * logoScale);
  const resizedLogo = await sharp(logoBuffer)
    .resize(logoWidth, null, { fit: 'inside' })
    .png()
    .toBuffer();
  const logoMeta = await sharp(resizedLogo).metadata();

  let left = Math.round((width - logoMeta.width) / 2);
  let top = Math.round((height - logoMeta.height) / 2);
  if (options.logoPosition) {
    left = Math.round(width * options.logoPosition.x) - Math.round(logoMeta.width / 2);
    top = Math.round(height * options.logoPosition.y) - Math.round(logoMeta.height / 2);
  }

  return sharp(templateBuffer)
    .composite([{ input: resizedLogo, left: Math.max(0, left), top: Math.max(0, top) }])
    .png()
    .toBuffer();
}

function listTemplates() {
  if (!fs.existsSync(TEMPLATES_DIR)) return [];
  return fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('.svg'))
    .map(f => f.replace('.svg', ''));
}

module.exports = { generateMockup, listTemplates };