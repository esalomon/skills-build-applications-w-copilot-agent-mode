import { Router } from 'express';

import { getApiBaseUrl } from '../config/baseUrl.js';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ name: 1 }).lean();

    res.json({
      route: '/api/users/',
      apiBaseUrl: getApiBaseUrl(),
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      route: '/api/users/',
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
