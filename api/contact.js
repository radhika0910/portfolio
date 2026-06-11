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
    const htmlToVisitor = `
      <div style="background-color: #0d0d0d; color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid #222;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 1px solid #222; padding-bottom: 20px; margin-bottom: 30px;">
          <span style="font-size: 24px; font-weight: 800; letter-spacing: 0.1em; color: #00e5ff;">R ✦ B</span>
          <p style="margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; color: #888;">AI & Data Science Engineer</p>
        </div>
        
        <!-- Body -->
        <div style="line-height: 1.6; font-size: 16px; color: #e0e0e0;">
          <h2 style="color: #ffffff; font-weight: 700; font-size: 20px; margin-top: 0;">Hi ${firstName},</h2>
          <p>Thank you for reaching out! I've successfully received your inquiry about <strong style="color: #00e5ff;">${projectType}</strong>.</p>
          
          <div style="background-color: #161616; border-left: 4px solid #00e5ff; padding: 15px 20px; margin: 25px 0; border-radius: 4px;">
            <h4 style="margin: 0 0 8px 0; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Your Project Details:</h4>
            <p style="margin: 0; font-style: italic; font-size: 14px; color: #aaa; white-space: pre-wrap;">"${message}"</p>
          </div>
          
          <p>I will review your message details and get back to you within 24 hours to discuss the next steps.</p>
          
          <p>In the meantime, feel free to explore my latest work and connect with me online:</p>
          
          <!-- CTA Buttons -->
          <div style="margin: 30px 0; text-align: center;">
            <a href="https://linkedin.com/in/radhika-bhoyar" target="_blank" style="background-color: #00e5ff; color: #0d0d0d; text-decoration: none; padding: 10px 24px; border-radius: 30px; font-weight: bold; font-size: 14px; display: inline-block; margin: 5px 10px;">LinkedIn Profile ↗</a>
            <a href="https://github.com/radhika0910" target="_blank" style="background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 30px; font-weight: bold; font-size: 14px; border: 1px solid #333; display: inline-block; margin: 5px 10px;">GitHub Portfolio ↗</a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 40px; border-top: 1px solid #222; padding-top: 20px; text-align: center; font-size: 12px; color: #666;">
          <p style="margin: 0 0 5px 0;">© Radhika Bhoyar // 2026</p>
          <p style="margin: 0;">Nagpur, India • radhika.bhoyar09@gmail.com</p>
        </div>
      </div>
    `;

    const mailToVisitor = {
      from: `"Radhika Bhoyar" <${emailUser}>`,
      to: email,
      subject: 'Thank you for reaching out! - Radhika Bhoyar',
      html: htmlToVisitor,
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
