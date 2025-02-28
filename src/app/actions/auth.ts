'use server';

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { RegisterInputs } from '@/schemas/registerSchema';
import { authMessages } from '@/constants/common';

const prisma = new PrismaClient();

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
    return { error: authMessages.emailExists };
  }
}

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
