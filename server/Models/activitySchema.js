import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        readStatus: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('activity', activitySchema);