const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const sendWhatsAppMessage = async (phoneNumber, message) => {
  const apiUrl = 'https://api.interakt.ai/v1/public/track/events/';
  const apiKey = process.env.INTERAKT_API_KEY;

  if (!apiKey) {
    throw new Error('INTERAKT_API_KEY not configured');
  }

  const payload = {
    userId: phoneNumber,
    eventName: "SEND_MESSAGE",
    traits: {
      phone: phoneNumber,
      message: message
    }
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  };

  try {
    const response = await axios.post(apiUrl, payload, config);
    if (response.data && response.data.result === true) {
      console.log('WhatsApp message sent successfully');
      return response.data;
    }
    throw new Error(response.data?.message || 'Failed to send message');
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    throw error;
  }
};

module.exports = { sendWhatsAppMessage };