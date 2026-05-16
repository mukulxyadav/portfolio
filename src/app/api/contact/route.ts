import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Use Gmail App Password if 2FA is enabled
  },
});

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequest = await request.json();
    const { name, email, message, honeypot } = body;

    // Honeypot spam protection
    if (honeypot) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email to you
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email
      subject: `Portfolio inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066cc;">New Message from Your Portfolio</h2>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
            ${message}
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated message from your portfolio contact form.</p>
        </div>
      `,
      replyTo: email,
    });

    // Send confirmation email to visitor
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for reaching out! - Mukul Kumar',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066cc;">Thank You, ${name}!</h2>
          <p>Thank you for reaching out through my portfolio. I've received your message and will get back to you as soon as possible.</p>
          
          <p><strong>Your Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
            ${message}
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p>In the meantime, feel free to connect with me on:</p>
          <ul>
            <li><a href="https://www.linkedin.com/in/mukul-kumar-867177320/">LinkedIn</a></li>
            <li><a href="https://github.com/mukulxyadav">GitHub</a></li>
            <li><a href="https://leetcode.com/u/mukulxyadav/">LeetCode</a></li>
          </ul>
          
          <p>Best regards,<br><strong>Mukul Kumar</strong></p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
