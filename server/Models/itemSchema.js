import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'boards',
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        title: { type: String, required: true },
        documentType: { type: Object, default: null },
        priority: { type: Object, default: null },
        description: { type: String, default: '' },
        dueDate: { type: Date, required: true },
        startDate: { type: Date, required: true },
        links: { type: Array },
        status: { type: Object, required: true },
        assignedTo: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            email: {
                type: String,
                default: ''
            },
            role: {
                type: String,
                default: ''
            },
            status: {
                type: String,
                default: 'Todo'
            },
            completeStatus: false,
        }],
        cc: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            email: {
                type: String,
                default: ''
            },
            role: {
                type: String,
                default: ''
            },
            status: {
                type: String,
                default: 'todo'
            },
            completeStatus: false,
        }],
        documents: [{
            name: String,
            url: String
        }],
        activity: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            text: String,
            readStatus: false,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }],
        history: [{
            previousVersionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'items',
                default: null
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }],
        previousVersionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'items'
        },
        // updateType: { type: String, default: null },
        // update: { type: String, default: null },
        isComplete: { type: Boolean, default: false },
        isArchived: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    },
);

itemSchema.index({ '$**': 'text' });

export default mongoose.model('items', itemSchema);