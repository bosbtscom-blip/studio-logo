const { convertSvg, exportAllFormats } = require('../services/inkscape');

module.exports = async (req, res) => {
  try {
    const svgContent = req.file ? req.file.buffer.toString('utf8') : req.body.svg;
    if (!svgContent) return res.status(400).json({ error: 'SVG manquant' });

    const format = req.body.format;
    if (format === 'all') {
      const files = await exportAllFormats(svgContent);
      const result = {};
      for (const [name, file] of Object.entries(files)) {
        result[name] = file.buffer.toString('base64');
      }
      return res.json({ files: result });
    }

    const { buffer, ext } = await convertSvg(svgContent, format);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="logo.${ext}"`);
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};