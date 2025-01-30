const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/initial-admin', authController.createInitialAdmin);

// Protected routes
router.get('/me', 
  authMiddleware.verifyToken, 
  authController.getMe
);

// Admin routes
router.get('/users', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  authController.getAllUsers
);

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