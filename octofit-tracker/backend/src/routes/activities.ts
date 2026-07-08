import { Router } from 'express';

import { getApiBaseUrl } from '../config/baseUrl.js';
import Activity from '../models/activity.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email fitnessLevel')
      .sort({ performedAt: -1 })
      .lean();

    res.json({
      route: '/api/activities/',
      apiBaseUrl: getApiBaseUrl(),
      count: activities.length,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      route: '/api/activities/',
      message: 'Failed to fetch activities',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
