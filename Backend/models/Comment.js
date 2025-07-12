const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment_description: {
        type: String,
        required: true
    }
  });

module.exports = mongoose.model('comment', CommentSchema)

