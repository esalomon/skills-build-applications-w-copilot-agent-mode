import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    focusArea: {
      type: String,
      enum: ['cardio', 'strength', 'mobility', 'endurance', 'recovery'],
      required: true
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 5
    },
    equipment: [
      {
        type: String,
        trim: true
      }
    ]
  },
  {
    timestamps: true
  }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default Workout;