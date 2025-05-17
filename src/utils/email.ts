import mailjet from 'node-mailjet';
import { AddEventInputs } from '@/schemas/addEventSchema';
import { EventCategoryEnum } from '@prisma/client';

// --------------------------------
// Email Client Configuration
// --------------------------------

/**
 * Gets a configured Mailjet client instance
 */
const getMailjetClient = () => {
  const apiKey = process.env.MAILJET_API_KEY;
  const secretKey = process.env.MAILJET_SECRET_KEY;

  if (!apiKey || !secretKey) {
    throw new Error('Mailjet API_KEY and SECRET_KEY are required');
  }

  return mailjet.apiConnect(apiKey, secretKey);
};

/**
 * Sends an email using the Mailjet API
 */
export async function sendEmail(to: string, subject: string, text: string) {
  try {
    // Check if required environment variables are set
    const apiKey = process.env.MAILJET_API_KEY;
    const secretKey = process.env.MAILJET_SECRET_KEY;
    const fromEmail = process.env.MAILJET_FROM_EMAIL || 'noreply@futbolovo.com';

    if (!apiKey || !secretKey) {
      console.error('Email configuration error:', {
        hasApiKey: !!apiKey,
        hasSecretKey: !!secretKey,
        hasFromEmail: !!fromEmail,
      });
      return { success: false, error: 'Email configuration error' };
    }

    // Log email content for debugging
    console.log('Attempting to send email:', {
      to,
      subject,
      textLength: text.length,
      textPreview: text.substring(0, 100) + '...',
      from: fromEmail,
    });

    // Initialize mailjet client
    const mailjetClient = getMailjetClient();

    const result = await mailjetClient
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: 'Futbolovo - best football map',
            },
            To: [
              {
                Email: to,
              },
            ],
            Subject: subject,
            TextPart: text,
          },
        ],
      });

    console.info('Email sent successfully:', {
      to,
      subject,
      status: result.body,
      response: result.response?.status,
    });
    return { success: true };
  } catch (error) {
    console.error('Email send error:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined,
      context: {
        to,
        subject,
        hasApiKey: !!process.env.MAILJET_API_KEY,
        hasSecretKey: !!process.env.MAILJET_SECRET_KEY,
        hasFromEmail: !!process.env.MAILJET_FROM_EMAIL,
      },
    });
    return { success: false, error: 'Failed to send email' };
  }
}

// --------------------------------
// Email Templates
// --------------------------------

/**
 * Generates an email notification for a newly created event
 */
export const generateEventAddedEmail = (
  eventData: AddEventInputs,
  eventId: string,
  appUrl: string | undefined,
  isSignedIn: boolean,
  t: (key: string) => string
) => {
  // Ensure we have a base URL
  const baseUrl = appUrl || 'https://futbolovo.com';
  const eventUrl = `${baseUrl}/events/${eventId}`;
  const eventType = getEventType(eventData.category, t);
  const email = eventData.email;
  const subject = t('email.eventAdded.subject').replace(
    '{eventType}',
    eventType
  );

  let text = t('email.eventAdded.greeting') + '\n\n';
  text += t('email.eventAdded.thanks') + '\n\n';

  // Event title and link
  text += `${t('name')}: ${eventData.name}\n`;
  text += `${t('email.eventAdded.link')}: ${eventUrl}\n\n`;

  // Different message for logged-in vs non-logged-in users
  if (isSignedIn) {
    text += t('email.eventAdded.loggedInInfo') + '\n';
  } else {
    text += t('email.eventAdded.createAccountInfo') + '\n';
    text += `${baseUrl}/register\n\n`;
  }

  text += t('email.eventAdded.footer');

  return { subject, text, email };
};

// --------------------------------
// Helper Functions
// --------------------------------

/**
 * Gets the translated event type based on category
 */
const getEventType = (
  category: EventCategoryEnum,
  t: (key: string) => string
) => {
  switch (category) {
    case EventCategoryEnum.TOURNAMENT:
      return t('tournament');
    case EventCategoryEnum.CAMP:
      return t('camp');
    case EventCategoryEnum.MATCH:
      return t('match');
    case EventCategoryEnum.LEAGUE:
      return t('league');
    case EventCategoryEnum.SCHOOL:
      return t('academyOrSchool');
    case EventCategoryEnum.SPORT_FIELD:
      return t('field');
    case EventCategoryEnum.SERVICE:
      return t('service');
    default:
      return t('event');
  }
};

/**
 * Prepares translations map for email notifications
 */
export function getEmailTranslations(
  t: (key: string) => string
): Record<string, string> {
  return {
    'email.eventAdded.subject': t('email.eventAdded.subject'),
    'email.eventAdded.greeting': t('email.eventAdded.greeting'),
    'email.eventAdded.thanks': t('email.eventAdded.thanks'),
    name: t('name'),
    tournament: t('tournament'),
    camp: t('camp'),
    match: t('match'),
    league: t('league'),
    academyOrSchool: t('academyOrSchool'),
    field: t('field'),
    service: t('service'),
    event: t('events'),
    'email.eventAdded.link': t('email.eventAdded.link'),
    'email.eventAdded.loggedInInfo': t('email.eventAdded.loggedInInfo'),
    'email.eventAdded.createAccountInfo': t(
      'email.eventAdded.createAccountInfo'
    ),
    'email.eventAdded.footer': t('email.eventAdded.footer'),
  };
}
