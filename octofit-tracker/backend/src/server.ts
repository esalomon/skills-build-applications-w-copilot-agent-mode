import cors from 'cors';
import express from 'express';
import 'dotenv/config';

import './config/database.js';

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  res.json({
    ok: true,
    service: 'octofit-backend',
    port: PORT,
    baseUrl,
    mongodb: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'
  });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on port ${PORT}`);
});
