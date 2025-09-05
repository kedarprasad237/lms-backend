const Topic = require('../models/Topic');

// Get all topics
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ order: 1 });
    res.json({
      success: true,
      topics
    });
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting topics'
    });
  }
};

// Get single topic
const getTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id);
    
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.json({
      success: true,
      topic
    });
  } catch (error) {
    console.error('Get topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting topic'
    });
  }
};

// Create topic (Admin only - for future use)
const createTopic = async (req, res) => {
  try {
    const { name, description, subtopics, order } = req.body;

    const topic = new Topic({
      name,
      description,
      subtopics: subtopics || [],
      order: order || 0
    });

    await topic.save();

    res.status(201).json({
      success: true,
      message: 'Topic created successfully',
      topic
    });
  } catch (error) {
    console.error('Create topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating topic'
    });
  }
};

// Update topic (Admin only - for future use)
const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, subtopics, order } = req.body;

    const topic = await Topic.findByIdAndUpdate(
      id,
      { name, description, subtopics, order },
      { new: true, runValidators: true }
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.json({
      success: true,
      message: 'Topic updated successfully',
      topic
    });
  } catch (error) {
    console.error('Update topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating topic'
    });
  }
};

// Delete topic (Admin only - for future use)
const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Topic.findByIdAndDelete(id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.json({
      success: true,
      message: 'Topic deleted successfully'
    });
  } catch (error) {
    console.error('Delete topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting topic'
    });
  }
};

module.exports = {
  getTopics,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic
};


