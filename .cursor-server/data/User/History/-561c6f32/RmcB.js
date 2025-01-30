const express = require('express');
const { verifyToken } = require('../middleware/auth');
const {
    sendMessage,
    getUserConversations,
    getConversationById
} = require('../controllers/conversationController');

const router = express.Router();

router.post('/message', verifyToken, sendMessage);
router.get('/', verifyToken, getUserConversations);
router.get('/:id', verifyToken, getConversationById);

module.exports = router; 