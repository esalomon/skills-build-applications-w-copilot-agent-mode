import { Router } from 'express';

import { getApiBaseUrl } from '../config/baseUrl.js';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 }).lean();

    res.json({
      route: '/api/workouts/',
      apiBaseUrl: getApiBaseUrl(),
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({
      route: '/api/workouts/',
      message: 'Failed to fetch workouts',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
