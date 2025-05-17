const express = require('express');
const { addFollowUpController, getFollowUpByStudentId, updateFollowUpByStudentId } = require('../controllers/followupController');
const router = express.Router();

router.post('/add-followup', addFollowUpController);
router.get('/follow-ups/:student_id',getFollowUpByStudentId)
router.put('/follow-ups/:student_id',updateFollowUpByStudentId)

module.exports = router;
