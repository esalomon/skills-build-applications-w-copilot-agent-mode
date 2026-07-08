import { Router } from 'express';

import { getApiBaseUrl } from '../config/baseUrl.js';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .sort({ rank: 1 })
      .lean();

    res.json({
      route: '/api/leaderboard/',
      apiBaseUrl: getApiBaseUrl(),
      count: leaderboard.length,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({
      route: '/api/leaderboard/',
      message: 'Failed to fetch leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
