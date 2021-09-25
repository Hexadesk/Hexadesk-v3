import mongoose from 'mongoose';

const ColumnSchema = new mongoose.Schema(
    {
        boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'boards' },
        title: { type: String, required: true },
        columnId: { type: String, required: true },
        cardIds: [{ type: String, ref: 'cards' }]
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('columns', ColumnSchema);