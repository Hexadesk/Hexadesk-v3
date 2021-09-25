import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    members: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
      },
      joinedStatus: { type: Boolean, default: true },
      role: String,
      email: String,
    }]
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('boards', BoardSchema);