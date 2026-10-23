const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const vectorizeRoute = require('./routes/vectorize');
const exportRoute = require('./routes/export');
const mockupRoute = require('./routes/mockup');

const app = express();
const PORT = process.env.PORT || 3000;

// Le serveur sert aussi la page web !
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(cors());
app.use(express.json({ limit: '20mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.mimetype);
    cb(ok ? null : new Error('Format non supporté'), ok);
  }
});

app.use('/api/vectorize', upload.single('image'), vectorizeRoute);
app.use('/api/export', upload.single('svg'), exportRoute);
app.use('/api/mockup', upload.single('logo'), mockupRoute);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));