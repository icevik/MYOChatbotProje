const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Admin routes
router.get('/pending-users', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  authController.getPendingUsers
);

router.patch('/users/:userId/status', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  authController.updateUserStatus
);

module.exports = router; 