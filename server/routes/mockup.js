const { generateMockup, listTemplates } = require('../services/mockup');

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      return res.json({ templates: listTemplates() });
    }
    if (!req.file) return res.status(400).json({ error: 'Logo manquant' });
    const { template, logoScale, posX, posY } = req.body;

    const mockup = await generateMockup(req.file.buffer, template || 'tshirt', {
      logoScale: logoScale ? parseFloat(logoScale) : 0.35,
      logoPosition: posX && posY ? { x: parseFloat(posX), y: parseFloat(posY) } : undefined,
    });

    res.setHeader('Content-Type', 'image/png');
    res.send(mockup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};