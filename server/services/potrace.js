const potrace = require('potrace');

function vectorize(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const params = {
      threshold: options.threshold || 128,
      color: options.color || '#000000',
      background: 'transparent',
      turdSize: 2,
      optTolerance: 0.2,
      alphaMax: 1.0,
    };
    potrace.trace(buffer, params, (err, svg) => {
      if (err) return reject(err);
      resolve(svg);
    });
  });
}

module.exports = { vectorize };