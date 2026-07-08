import { Router } from 'express';

import { getApiBaseUrl } from '../config/baseUrl.js';
import Team from '../models/team.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find()
      .populate('captain', 'name email')
      .populate('members', 'name email')
      .sort({ name: 1 })
      .lean();

    res.json({
      route: '/api/teams/',
      apiBaseUrl: getApiBaseUrl(),
      count: teams.length,
      data: teams
    });
  } catch (error) {
    res.status(500).json({
      route: '/api/teams/',
      message: 'Failed to fetch teams',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
