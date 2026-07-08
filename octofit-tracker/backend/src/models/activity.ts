import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'hiit', 'swim'],
      required: true
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1
    },
    caloriesBurned: {
      type: Number,
      required: true,
      min: 1
    },
    distanceKm: {
      type: Number,
      min: 0,
      default: 0
    },
    performedAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

export default Activity;