import mailjet from 'node-mailjet';

const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY as string,
  process.env.MAILJET_SECRET_KEY as string
);

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    const result = await mailjetClient
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAILJET_FROM_EMAIL as string,
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

    console.info('Email sent:', result.body);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
