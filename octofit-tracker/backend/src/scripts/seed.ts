import mongoose from 'mongoose';

import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const [teamStride, teamPulse] = await Team.insertMany([
      {
        name: 'Team Stride Squad',
        description: 'Runners and endurance athletes focused on weekly mileage.'
      },
      {
        name: 'Team Pulse Power',
        description: 'Cross-training crew combining strength, HIIT, and mobility.'
      }
    ]);

    const [ava, noah, liam, sophia, maya] = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@octofit.dev',
        age: 28,
        fitnessLevel: 'advanced',
        team: teamStride._id,
        weeklyGoal: 6
      },
      {
        name: 'Noah Patel',
        email: 'noah.patel@octofit.dev',
        age: 32,
        fitnessLevel: 'intermediate',
        team: teamStride._id,
        weeklyGoal: 5
      },
      {
        name: 'Liam Chen',
        email: 'liam.chen@octofit.dev',
        age: 25,
        fitnessLevel: 'intermediate',
        team: teamPulse._id,
        weeklyGoal: 4
      },
      {
        name: 'Sophia Martinez',
        email: 'sophia.martinez@octofit.dev',
        age: 30,
        fitnessLevel: 'advanced',
        team: teamPulse._id,
        weeklyGoal: 6
      },
      {
        name: 'Maya Johnson',
        email: 'maya.johnson@octofit.dev',
        age: 22,
        fitnessLevel: 'beginner',
        team: null,
        weeklyGoal: 3
      }
    ]);

    await Team.findByIdAndUpdate(teamStride._id, {
      captain: ava._id,
      members: [ava._id, noah._id]
    });

    await Team.findByIdAndUpdate(teamPulse._id, {
      captain: sophia._id,
      members: [liam._id, sophia._id]
    });

    const workouts = await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        description: 'Steady-state run with threshold intervals to improve pace control.',
        difficulty: 'intermediate',
        focusArea: 'endurance',
        durationMinutes: 50,
        equipment: ['running shoes', 'watch']
      },
      {
        title: 'Full Body Strength Circuit',
        description: 'Compound lifts and bodyweight moves in alternating rounds.',
        difficulty: 'advanced',
        focusArea: 'strength',
        durationMinutes: 45,
        equipment: ['dumbbells', 'mat']
      },
      {
        title: 'Beginner Cardio Kickstart',
        description: 'Low-impact cardio intervals with active recovery breaks.',
        difficulty: 'beginner',
        focusArea: 'cardio',
        durationMinutes: 30,
        equipment: ['jump rope']
      },
      {
        title: 'Mobility Reset Flow',
        description: 'Hip, ankle, and thoracic spine mobility sequence for recovery days.',
        difficulty: 'beginner',
        focusArea: 'mobility',
        durationMinutes: 25,
        equipment: ['yoga mat', 'resistance band']
      },
      {
        title: 'Recovery Zone Ride',
        description: 'Easy spin session to maintain movement and speed recovery.',
        difficulty: 'intermediate',
        focusArea: 'recovery',
        durationMinutes: 40,
        equipment: ['stationary bike', 'heart rate monitor']
      }
    ]);

    const now = Date.now();

    const activities = await Activity.insertMany([
      {
        user: ava._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 640,
        distanceKm: 10.2,
        performedAt: new Date(now - 1000 * 60 * 60 * 26)
      },
      {
        user: noah._id,
        type: 'cycle',
        durationMinutes: 44,
        caloriesBurned: 510,
        distanceKm: 16.5,
        performedAt: new Date(now - 1000 * 60 * 60 * 18)
      },
      {
        user: liam._id,
        type: 'strength',
        durationMinutes: 48,
        caloriesBurned: 430,
        distanceKm: 0,
        performedAt: new Date(now - 1000 * 60 * 60 * 8)
      },
      {
        user: sophia._id,
        type: 'hiit',
        durationMinutes: 32,
        caloriesBurned: 470,
        distanceKm: 0,
        performedAt: new Date(now - 1000 * 60 * 60 * 4)
      },
      {
        user: maya._id,
        type: 'yoga',
        durationMinutes: 35,
        caloriesBurned: 180,
        distanceKm: 0,
        performedAt: new Date(now - 1000 * 60 * 60 * 2)
      }
    ]);

    const weekOf = new Date();
    weekOf.setHours(0, 0, 0, 0);

    const leaderboardEntries = await Leaderboard.insertMany([
      {
        user: ava._id,
        team: teamStride._id,
        points: 196,
        rank: 1,
        weekOf
      },
      {
        user: sophia._id,
        team: teamPulse._id,
        points: 181,
        rank: 2,
        weekOf
      },
      {
        user: noah._id,
        team: teamStride._id,
        points: 163,
        rank: 3,
        weekOf
      },
      {
        user: liam._id,
        team: teamPulse._id,
        points: 149,
        rank: 4,
        weekOf
      },
      {
        user: maya._id,
        team: null,
        points: 96,
        rank: 5,
        weekOf
      }
    ]);

    await Team.findByIdAndUpdate(teamStride._id, { totalPoints: 359 });
    await Team.findByIdAndUpdate(teamPulse._id, { totalPoints: 330 });

    console.log(`Seeded users: ${[ava, noah, liam, sophia, maya].length}`);
    console.log(`Seeded teams: ${[teamStride, teamPulse].length}`);
    console.log(`Seeded activities: ${activities.length}`);
    console.log(`Seeded leaderboard entries: ${leaderboardEntries.length}`);
    console.log(`Seeded workouts: ${workouts.length}`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
