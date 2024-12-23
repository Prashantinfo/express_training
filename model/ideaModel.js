const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        // trim: true,
        maxlength: [100, 'Title must not exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description must not exceed 500 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Idea', ideaSchema);
