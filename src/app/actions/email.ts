'use server';

import { sendEmail } from '@/utils/email';

/**
 * Server action for sending an email notification when an event is added
 */
export async function sendEventAddedEmail(emailData: {
  subject: string;
  text: string;
  email: string;
}) {
  try {
    // Log environment setup for debugging
    console.log('Email environment check:', {
      hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL,
      hasMailjetApiKey: !!process.env.MAILJET_API_KEY,
      hasMailjetSecretKey: !!process.env.MAILJET_SECRET_KEY,
      hasMailjetFromEmail: !!process.env.MAILJET_FROM_EMAIL,
    });

    const { subject, text, email } = emailData;

    const result = await sendEmail(email, subject, text);
    console.log('Email sending result:', result);
    return result;
  } catch (error) {
    console.error('Failed to send event added email:', {
      error,
    });
    return { success: false, error: 'Failed to send email' };
  }
}
