const { vectorize } = require('../services/potrace');

module.exports = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Aucune image fournie' });
    const svg = await vectorize(req.file.buffer, {
      threshold: req.body.threshold ? parseInt(req.body.threshold) : 128,
      color: req.body.color || '#000000',
    });
    res.json({ svg, size: svg.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};