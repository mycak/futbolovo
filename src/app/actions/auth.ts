'use server';

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { RegisterInputs } from '@/schemas/registerSchema';
import { authMessages } from '@/constants/common';
import { randomBytes } from 'crypto';
import { sendEmail } from '@/utils/email';
import { paths } from '@/constants/paths';
const prisma = new PrismaClient();

//MARK: REGISTER
export async function registerUser(userPayload: RegisterInputs) {
  const { email, password, firstName, lastName, companyName } = userPayload;
  if (!email || !password) {
    return { error: authMessages.credentialsRequired };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        password: hashedPassword,
        lastName,
        companyName,
      },
    });

    return { message: 'User created successfully!', user };
  } catch (error) {
    console.error(error);
    return { error: authMessages.emailExists };
  }
}

//MARK: CHANGE PASSWORD
export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
) {
  if (!oldPassword || !newPassword) {
    return { error: 'Both old and new passwords are required' };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return { error: 'User not found' };
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    return { error: 'Old password is incorrect' };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { message: 'Password updated successfully' };
}

//MARK: RESET PASSWORD
export async function requestPasswordReset(
  email: string,
  transOptions: { title: string; emailBody: string }
) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: 'userNotFound' };
  }

  const resetToken = randomBytes(32).toString('hex');
  const resetTokenExpires = new Date(Date.now() + 3600000 * 4); // 4h
  await prisma.user.update({
    where: { email },
    data: { resetToken, resetTokenExpires },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}${paths.PasswordResetConfirm}?token=${resetToken}`;

  await sendEmail(
    email,
    transOptions.title,
    `${transOptions.emailBody} ${resetLink}`
  );

  return { message: 'resetEmailSent' };
}

//MARK: CONFIRM RESET PASSWORD (CHANGE TO NEW)
export async function resetPassword(token: string, newPassword: string) {
  const user = await prisma.user.findFirst({
    where: { resetToken: token, resetTokenExpires: { gt: new Date() } },
  });

  if (!user) {
    return { error: 'invalidOrExpiredToken' };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  return { message: 'passwordResetSuccess' };
}
