import { Router } from 'express';

import { getApiBaseUrl } from '../config/baseUrl.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    route: '/api/users/',
    message: 'Users endpoint is ready',
    apiBaseUrl: getApiBaseUrl()
  });
});

export default router;
