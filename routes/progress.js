const express = require('express');
const { body } = require('express-validator');
const {
  updateProgress,
  getProgress,
  getProgressSummary
} = require('../controllers/progressController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation rules
const updateProgressValidation = [
  body('topicId')
    .notEmpty()
    .withMessage('Topic ID is required'),
  body('subtopicId')
    .notEmpty()
    .withMessage('Subtopic ID is required'),
  body('status')
    .isIn(['pending', 'done'])
    .withMessage('Status must be either "pending" or "done"')
];

// All progress routes require authentication
router.use(auth);

router.put('/update', updateProgressValidation, updateProgress);
router.get('/', getProgress);
router.get('/summary', getProgressSummary);

module.exports = router;


