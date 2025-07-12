const mongoose = require('mongoose')

const UserStorySchema = new mongoose.Schema({
    sprint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        required: true
    }]
  });

module.exports = mongoose.model('userstory', UserStorySchema)

