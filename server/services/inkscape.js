const { execFile } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const os = require('os');

const execFileAsync = promisify(execFile);
const INKSCAPE = process.env.INKSCAPE_PATH || 'inkscape';

async function convertSvg(svgContent, format = 'pdf', options = {}) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'logo-'));
  const inputPath = path.join(tmpDir, 'input.svg');
  const outputPath = path.join(tmpDir, `output.${format === 'ai' ? 'pdf' : format}`);
  fs.writeFileSync(inputPath, svgContent);

  const args = [inputPath, '--export-filename=' + outputPath];
  if (format === 'png') {
    args.push('--export-type=png', `--export-width=${options.width || 1024}`,
      '--export-background=' + (options.background || 'transparent'),
      '--export-dpi=' + (options.dpi || 300));
  } else if (format === 'pdf' || format === 'eps') {
    args.push(`--export-type=${format}`, '--export-text-to-path');
  }

  try {
    await execFileAsync(INKSCAPE, args, { timeout: 30000 });
    const result = fs.readFileSync(outputPath);
    fs.rmSync(tmpDir, { recursive: true, force: true });
    return { buffer: result, ext: format === 'ai' ? 'pdf' : format };
  } catch (err) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    throw new Error(`Inkscape failed: ${err.stderr || err.message}`);
  }
}

async function exportAllFormats(svgContent) {
  const formats = {};
  formats['print/logo_couleur.pdf'] = await convertSvg(svgContent, 'pdf');
  formats['print/logo_couleur.eps'] = await convertSvg(svgContent, 'eps');
  formats['print/logo_couleur.png'] = await convertSvg(svgContent, 'png', { width: 3000, dpi: 300 });
  formats['ecran_web/logo_couleur.svg'] = { buffer: Buffer.from(svgContent), ext: 'svg' };
  formats['ecran_web/logo_couleur.png'] = await convertSvg(svgContent, 'png', { width: 512 });
  formats['ecran_web/favicon.png'] = await convertSvg(svgContent, 'png', { width: 32 });
  formats['ecran_web/apple-touch-icon.png'] = await convertSvg(svgContent, 'png', { width: 180 });
  return formats;
}

module.exports = { convertSvg, exportAllFormats };