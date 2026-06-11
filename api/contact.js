const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, phone, projectType, message } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error('Email credentials not configured in Vercel environment variables.');
    return res.status(500).json({
      message: 'SMTP credentials not configured. Please set EMAIL_USER and EMAIL_PASS.'
    });
  }

  // Create transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  try {
    // 1. Send notification to you
    const mailToSelf = {
      from: `"${firstName} ${lastName}" <${emailUser}>`,
      to: 'radhika.bhoyar09@gmail.com',
      replyTo: email,
      subject: `New Portfolio Inquiry: ${projectType}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nProject Type: ${projectType}\n\nMessage:\n${message}`
    };

    // 2. Send automatic thank-you confirmation to visitor
    const mailToVisitor = {
      from: `"Radhika Bhoyar" <${emailUser}>`,
      to: email,
      subject: 'Thank you for reaching out! - Radhika Bhoyar',
      text: `Hi ${firstName},\n\nThank you for reaching out! I have received your message regarding "${projectType}".\n\nI will review your message details and get back to you as soon as possible.\n\nBest regards,\nRadhika Bhoyar\nAI & Data Science Engineer\nNagpur, India`
    };

    // Execute both sends in parallel
    await Promise.all([
      transporter.sendMail(mailToSelf),
      transporter.sendMail(mailToVisitor)
    ]);

    return res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Nodemailer SMTP error:', error);
    return res.status(500).json({ message: 'Failed to send emails', error: error.message });
  }
};
