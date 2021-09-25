import mongoose from 'mongoose';

const listSchema = new mongoose.Schema(
    {
        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'boards',
            required: true
        },
        title: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('lists', listSchema);