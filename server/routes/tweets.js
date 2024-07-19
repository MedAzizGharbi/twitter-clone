const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet');
const authMiddleware = require('../middleware/authMiddleware');

// Post a tweet
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newTweet = new Tweet({ content: req.body.content, author: req.user.id });
    await newTweet.save();
    res.status(201).json(newTweet);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all tweets
router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find().populate('author', 'username');
    res.json(tweets);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
