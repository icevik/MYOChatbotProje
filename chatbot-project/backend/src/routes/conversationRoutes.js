const express = require('express');
const { auth } = require('../middleware/auth');
const {
    sendMessage,
    getUserConversations,
    getConversationById
} = require('../controllers/conversationController');

const router = express.Router();

router.post('/message', auth, sendMessage);
router.get('/', auth, getUserConversations);
router.get('/:id', auth, getConversationById);

module.exports = router; 