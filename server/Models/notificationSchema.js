import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            default: ''
        },
        text: { type: String, required: true },
        type: { type: String, required: true },
        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'boards',
            default: null
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'items',
            default: null
        },
        prevVersionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'items',
            default: null
        },
        by: { type: String, default: '' },
        readStatus: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('notifications', notificationSchema);