import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    captain: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    totalPoints: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default Team;