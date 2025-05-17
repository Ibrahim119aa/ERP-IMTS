const express = require('express');
const router = express.Router();
const { getApprovePaymentBetweenTwoDate,calculatePendingAmount,generatePaymentDetails } = require('../controllers/paymentController'); // Adjust path to your controller


router.get('/calculate-balance/:id', calculatePendingAmount);
router.get('/payment-details/:id', generatePaymentDetails);
router.post('/get-payment-between-two-date', getApprovePaymentBetweenTwoDate);

module.exports = router;
