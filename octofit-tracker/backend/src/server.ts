import cors from 'cors';
import express from 'express';
import 'dotenv/config';

import './config/database.js';
import { getApiBaseUrl } from './config/baseUrl.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  const baseUrl = getApiBaseUrl();

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
