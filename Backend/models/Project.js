const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    project_description: {
        type: String,
        required: true
    },
    project_manager: {
        type: String,
        required: true
    },
    total_story_points: {
        type: Number,
        required: true
    },
    completed_story_points: {
        type: Number,
        required: true,
        default:0
    },
    project_status: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('Project', ProjectSchema)
