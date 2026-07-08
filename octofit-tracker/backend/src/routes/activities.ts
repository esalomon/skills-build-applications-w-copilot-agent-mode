import { Router } from 'express';

import { getApiBaseUrl } from '../config/baseUrl.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    route: '/api/activities/',
    message: 'Activities endpoint is ready',
    apiBaseUrl: getApiBaseUrl()
  });
});

export default router;
