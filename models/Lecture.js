const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },

    content:{
        type: String,
        required: [true, 'Content is required'],
        trim: true
    },
    
    description:{
        type: String,
        required: false,
        trim: true
    },

    userId:{
        type: String,
        required: [true, 'User ID is required']
    },

    isPublicTo:{
        type:[String],
        required: false
    }
},{
    timestamps: { createdAt: 'created', updatedAt: 'updated'}
}
);

const Lecture = mongoose.model('Lecture', lectureSchema);
module.exports = Lecture;