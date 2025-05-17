'use server';

import { sendEmail, generateEventAddedEmail } from '@/utils/email';
import { AddEventInputs } from '@/schemas/addEventSchema';
import { translate } from '@/app/i18n';

/**
 * Server action for sending an email notification when an event is added
 */
export async function sendEventAddedEmail(
  eventData: AddEventInputs,
  eventId: string,
  isSignedIn: boolean,
  lng: string // Changed to accept language code instead of translations
) {
  try {
    // Log environment setup for debugging
    console.log('Email environment check:', {
      hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL,
      hasMailjetApiKey: !!process.env.MAILJET_API_KEY,
      hasMailjetSecretKey: !!process.env.MAILJET_SECRET_KEY,
      hasMailjetFromEmail: !!process.env.MAILJET_FROM_EMAIL,
    });

    // Get the app URL from environment variables
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://futbolovo.com';

    // Initialize translations on the server side
    const { t } = await translate(lng);

    const { subject, text } = generateEventAddedEmail(
      eventData,
      eventId,
      appUrl,
      isSignedIn,
      t
    );

    const result = await sendEmail(eventData.email, subject, text);
    console.log('Email sending result:', result);
    return result;
  } catch (error) {
    console.error('Failed to send event added email:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined,
      eventData: {
        email: eventData.email,
        eventId,
        isSignedIn,
      },
    });
    return { success: false, error: 'Failed to send email' };
  }
}
