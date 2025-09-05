const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  leetCodeLink: {
    type: String,
    default: ''
  },
  youtubeLink: {
    type: String,
    default: ''
  },
  articleLink: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  }
});

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  subtopics: [subtopicSchema],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Topic', topicSchema);

