const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Feedback = require('../models/feedback');

// Verify webhook signature
const verifyWebhookSignature = (req, res, next) => {
  try {
    const signature = req.headers['x-webhook-signature'];
    const webhookSecret = process.env.FRILL_WEBHOOK_SECRET;
    
    if (!signature || !webhookSecret) {
      return res.status(401).json({ error: 'Missing signature or webhook secret' });
    }

    const payload = JSON.stringify(req.body);
    const hmac = crypto.createHmac('sha256', webhookSecret.trim());
    const digest = hmac.update(payload).digest('hex');
    
    if (signature !== digest) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    next();
  } catch (error) {
    console.error('Signature verification error:', error);
    res.status(401).json({ error: 'Signature verification failed' });
  }
};

// Handle incoming webhooks
router.post('/feedback', verifyWebhookSignature, async (req, res) => {
  try {
    console.log('Received webhook payload:', req.body);
    const { type, data } = req.body;
    
    switch (type) {
      case 'idea.created':
        // Create new feedback
        const newFeedback = new Feedback({
          title: data.title,
          category: data.labels?.[0] || 'General',
          comment: data.description,
          status: data.status || 'open',
          rating: parseInt(data.metadata?.rating) || 0,
          userId: data.metadata?.userId,
          userName: data.metadata?.userName,
          metadata: data.metadata
        });
        await newFeedback.save();
        console.log('Created new feedback:', newFeedback);
        break;
        
      case 'idea.updated':
        // Update existing feedback
        if (data.metadata?.id) {
          await Feedback.findByIdAndUpdate(data.metadata.id, {
            title: data.title,
            category: data.labels?.[0],
            comment: data.description,
            status: data.status || 'open',
            metadata: data.metadata
          });
          console.log('Updated feedback:', data.metadata.id);
        }
        break;

      case 'idea.deleted':
        // Soft delete feedback
        if (data.metadata?.id) {
          await Feedback.findByIdAndUpdate(data.metadata.id, {
            status: 'deleted'
          });
          console.log('Deleted feedback:', data.metadata.id);
        }
        break;
    }
    
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

module.exports = router;
