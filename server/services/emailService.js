const axios = require('axios');

const sendEmail = async (toEmail, subject, body) => {
  const apiUrl = 'https://api.sendgrid.com/v3/mail/send';

  try {
    const response = await axios.post(apiUrl, {
      personalizations: [{ to: [{ email: toEmail }] }],
      from: { email: 'noreply@yourcompany.com' },
      subject: subject,
      content: [{ type: 'text/plain', value: body }],
    }, {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
    });
    console.log('Email sent:', response.data);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

module.exports = { sendEmail };