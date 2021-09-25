import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema(
    {
        cardId: { type: String },
        title: { type: String, required: true },
        column: { type: String, ref: 'columns' }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('cards', CardSchema);