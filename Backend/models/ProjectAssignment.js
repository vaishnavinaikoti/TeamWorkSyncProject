const mongoose = require('mongoose')

const AssignmentSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    employees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    }]
  });

module.exports = mongoose.model('projectAssignment', AssignmentSchema)

