const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const Feedback = require('../models/feedback');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

// Submit feedback through webhook
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { category, rating, comment } = req.body;

    // Create feedback in local database first
    const feedback = new Feedback({
      title: `${category} Feedback`,
      category,
      rating,
      comment,
      userId: req.user._id,
      userName: req.user.name,
      status: 'pending'
    });

    await feedback.save();

    // Send feedback to Frill
    const webhookData = {
      type: 'idea.created',
      data: {
        title: feedback.title,
        description: comment,
        status: 'open',
        labels: [category],
        metadata: {
          id: feedback._id.toString(),
          rating: rating.toString(),
          userId: req.user._id.toString(),
          userName: req.user.name
        }
      }
    };

    console.log('Sending webhook data:', webhookData);

    const webhookSecret = process.env.FRILL_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('FRILL_WEBHOOK_SECRET is not configured');
    }

    // Add webhook signature
    const payload = JSON.stringify(webhookData);
    const signature = crypto
      .createHmac('sha256', webhookSecret.trim())
      .update(payload)
      .digest('hex');

    const webhookUrl = process.env.FRILL_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('FRILL_WEBHOOK_URL is not configured');
    }

    console.log('Sending to webhook URL:', webhookUrl);

    const response = await axios.post(webhookUrl, webhookData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature
      }
    });

    console.log('Webhook response:', response.data);

    res.status(201).json({ 
      message: 'Feedback submitted successfully',
      feedback 
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ 
      message: 'Error submitting feedback',
      error: error.message
    });
  }
});

// Get all feedback
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ status: { $ne: 'deleted' } })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

// Get feedback by category
router.get('/category/:category', async (req, res) => {
  try {
    const feedback = await Feedback.find({ 
      category: req.params.category,
      status: { $ne: 'deleted' }
    })
    .populate('userId', 'name')
    .sort('-createdAt');
    
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

// Get user's feedback
router.get('/user', isAuthenticated, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ 
      userId: req.user._id,
      status: { $ne: 'deleted' } 
    }).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching user feedback:', error);
    res.status(500).json({ message: 'Error fetching user feedback' });
  }
});

// Get feedback statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $match: { status: { $ne: 'deleted' } }
      },
      {
        $group: {
          _id: '$category',
          averageRating: { $avg: '$rating' },
          totalFeedback: { $sum: 1 },
          statusCounts: {
            $push: {
              status: '$status',
              count: 1
            }
          }
        }
      },
      {
        $project: {
          category: '$_id',
          averageRating: 1,
          totalFeedback: 1,
          statusBreakdown: {
            $reduce: {
              input: '$statusCounts',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  { ['$$this.status']: { $sum: '$$this.count' } }
                ]
              }
            }
          }
        }
      }
    ]);
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({ message: 'Error fetching feedback stats' });
  }
});

module.exports = router;
