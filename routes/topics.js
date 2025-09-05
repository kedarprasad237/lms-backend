const express = require('express');
const {
  getTopics,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic
} = require('../controllers/topicController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getTopics);
router.get('/:id', getTopic);

// Protected routes (for future admin functionality)
router.post('/', auth, createTopic);
router.put('/:id', auth, updateTopic);
router.delete('/:id', auth, deleteTopic);

module.exports = router;


