const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');

router.post("/mail-status",communicationController.mailStatus);

router.post("/get-mail-status",communicationController.getMailStatus);
router.post("/send-payment-link",communicationController.sendPaymentLink);
router.get("/get-whatsapp-status/:id",communicationController.getWhatsappStatus);
router.post('/send-whatsapp', communicationController.sendWhatsApp);
router.post('/send-email', communicationController.sendEmail);
router.post('/bulk-mail', communicationController.sendBulkMAil);
router.post('/bulk-whatsapp', communicationController.bulkWhatsApp);
router.post('/single-wpm',communicationController.singleWhatsapp)
router.post('/sendBulkWhatsApp',communicationController.sendBulkWhatsApp)
router.get("/get-template-list",communicationController.getTemplateList);
router.post("/get-template-list",communicationController.getTemplateData);
router.post("/whatapps-template-mapping",communicationController.addWhatsappTemplateMapping);
router.post("/chatboot/webhook",communicationController.getMessageStatus);


module.exports = router;

/* 
    ***** Sample Data for bulk what's app ******
    {
        "templateId": "your_template_id",
        "languageCode": "en",
        "recipients": [
            {
                "countryCode": "91",
                "phoneNumber": "9876543210"
            },
            {
                "countryCode": "1",
                "phoneNumber": "1234567890"
            }
        ],
        "placeholders": {
            "header": ["Header Placeholder"],
            "body": ["Body Placeholder 1", "Body Placeholder 2"]
        }
    }


    ****** Sample Data for bulk mail *******
    {
        "subject": "Welcome to Our Platform",
        "message": "Hello! Thank you for joining us.",
        "recipients": ["user1@example.com", "user2@example.com"]
    }

*/