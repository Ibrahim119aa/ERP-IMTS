const express = require('express');
const { handleStudentQuery} = require('../controllers/chatbotController');
const router = express.Router();

router.post('/webhook', handleStudentQuery);
// router.post('/sendMessage', handleSendMessage);
module.exports = router;
