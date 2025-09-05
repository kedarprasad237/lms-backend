const User = require('../models/User');
const Topic = require('../models/Topic');

// Update user progress
const updateProgress = async (req, res) => {
  try {
    const { topicId, subtopicId, status } = req.body;
    const userId = req.user._id;

    // Validate status
    if (!['pending', 'done'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "pending" or "done"'
      });
    }

    // Check if topic exists
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Check if subtopic exists
    const subtopic = topic.subtopics.find(sub => sub._id.toString() === subtopicId);
    if (!subtopic) {
      return res.status(404).json({
        success: false,
        message: 'Subtopic not found'
      });
    }

    // Find existing progress entry
    const user = await User.findById(userId);
    const existingProgressIndex = user.progress.findIndex(
      p => p.topicId.toString() === topicId && p.subtopicId === subtopicId
    );

    if (existingProgressIndex !== -1) {
      // Update existing progress
      user.progress[existingProgressIndex].status = status;
      await user.save();
    } else {
      // Add new progress entry
      user.progress.push({
        topicId,
        subtopicId,
        status
      });
      await user.save();
    }

    // Get updated user with progress
    const updatedUser = await User.findById(userId).select('-password');

    res.json({
      success: true,
      message: 'Progress updated successfully',
      progress: updatedUser.progress
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating progress'
    });
  }
};

// Get user progress
const getProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password');

    res.json({
      success: true,
      progress: user.progress
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting progress'
    });
  }
};

// Get progress summary
const getProgressSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('progress');

    // Get all topics
    const topics = await Topic.find().sort({ order: 1 });

    // Calculate progress for each topic
    const topicProgress = topics.map(topic => {
      const topicProgressEntries = user.progress.filter(p => 
        p.topicId.toString() === topic._id.toString()
      );

      const totalSubtopics = topic.subtopics.length;
      const completedSubtopics = topicProgressEntries.filter(p => p.status === 'done').length;
      const pendingSubtopics = totalSubtopics - completedSubtopics;

      // Calculate progress by difficulty
      const difficultyProgress = {
        easy: { completed: 0, total: 0 },
        medium: { completed: 0, total: 0 },
        hard: { completed: 0, total: 0 }
      };

      topic.subtopics.forEach(subtopic => {
        const progressEntry = topicProgressEntries.find(p => 
          p.subtopicId === subtopic._id.toString()
        );
        
        difficultyProgress[subtopic.level].total++;
        if (progressEntry && progressEntry.status === 'done') {
          difficultyProgress[subtopic.level].completed++;
        }
      });

      return {
        topicId: topic._id,
        topicName: topic.name,
        totalSubtopics,
        completedSubtopics,
        pendingSubtopics,
        completionPercentage: totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0,
        difficultyProgress
      };
    });

    // Calculate overall statistics
    const totalTopics = topics.length;
    const totalSubtopics = topics.reduce((sum, topic) => sum + topic.subtopics.length, 0);
    const totalCompleted = user.progress.filter(p => p.status === 'done').length;
    const totalPending = totalSubtopics - totalCompleted;

    // Calculate overall difficulty statistics
    const overallDifficultyStats = {
      easy: { completed: 0, total: 0 },
      medium: { completed: 0, total: 0 },
      hard: { completed: 0, total: 0 }
    };

    topics.forEach(topic => {
      topic.subtopics.forEach(subtopic => {
        const progressEntry = user.progress.find(p => 
          p.topicId.toString() === topic._id.toString() && 
          p.subtopicId === subtopic._id.toString()
        );
        
        overallDifficultyStats[subtopic.level].total++;
        if (progressEntry && progressEntry.status === 'done') {
          overallDifficultyStats[subtopic.level].completed++;
        }
      });
    });

    res.json({
      success: true,
      summary: {
        totalTopics,
        totalSubtopics,
        totalCompleted,
        totalPending,
        overallCompletionPercentage: totalSubtopics > 0 ? Math.round((totalCompleted / totalSubtopics) * 100) : 0,
        difficultyStats: {
          easy: overallDifficultyStats.easy.total > 0 ? 
            Math.round((overallDifficultyStats.easy.completed / overallDifficultyStats.easy.total) * 100) : 0,
          medium: overallDifficultyStats.medium.total > 0 ? 
            Math.round((overallDifficultyStats.medium.completed / overallDifficultyStats.medium.total) * 100) : 0,
          hard: overallDifficultyStats.hard.total > 0 ? 
            Math.round((overallDifficultyStats.hard.completed / overallDifficultyStats.hard.total) * 100) : 0
        }
      },
      topicProgress
    });
  } catch (error) {
    console.error('Get progress summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting progress summary'
    });
  }
};

module.exports = {
  updateProgress,
  getProgress,
  getProgressSummary
};

