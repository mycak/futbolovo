'use server';

import { sendEmail, generateEventAddedEmail } from '@/utils/email';
import { AddEventInputs } from '@/schemas/addEventSchema';

/**
 * Server action for sending an email notification when an event is added
 */
export async function sendEventAddedEmail(
  eventData: AddEventInputs,
  eventId: string,
  isSignedIn: boolean,
  t: Record<string, string>
) {
  try {
    // Get the app URL from environment variables
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://futbolovo.com';

    // We need to adapt the translation function for server context
    const translateFn = (key: string) => {
      return t[key] || key;
    };

    const { subject, text } = generateEventAddedEmail(
      eventData,
      eventId,
      appUrl,
      isSignedIn,
      translateFn
    );

    return await sendEmail(eventData.email, subject, text);
  } catch (error) {
    console.error('Failed to send event added email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
