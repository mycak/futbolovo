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
