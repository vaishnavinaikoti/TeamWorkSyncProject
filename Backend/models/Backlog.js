const mongoose = require('mongoose')

const BacklogSchema = new mongoose.Schema({
    backlog_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:false
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    sprint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint',
        required: false
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: false
    },
    backlogId: {
        type: String,
        required: true
    },
    backlogTitle: {
        type: String,
        required: true
    },
    backlogDescription: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Backlog', BacklogSchema)
