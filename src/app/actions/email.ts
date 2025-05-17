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
  const { subject, text, email } = emailData;

  const result = await sendEmail(email, subject, text).catch((error) =>
    console.error('Failed to send event added email:', {
      error,
    })
  );
  return result;
}
