const nodemailer = require('nodemailer');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      
      // Send email to tutor
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: data.tutorEmail,
        subject: `New RTR Tutoring Request from ${data.studentName}`,
        text: `
You have a new tutoring request!

Student Name: ${data.studentName}
Student Grade: ${data.grade}
Contact: ${data.contact}
Subjects: ${data.subjects}
Duration: ${data.time} minutes
Extra Notes: ${data.notes || ''}

Please reply to the student ASAP.
        `
      };

      await transporter.sendMail(mailOptions);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true })
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: error.message })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};
