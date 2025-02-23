import NextAuth, {
  NextAuthOptions,
  SessionStrategy,
  User,
  Session,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { authMessages } from '@/constants/common';
import { JWT } from 'next-auth/jwt';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(authMessages.credentialsRequired);
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error(authMessages.userNotFound);
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error(authMessages.invalidPassword);
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          createdAt: user.createdAt.toISOString(),
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.companyName = user.companyName;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.companyName = token.companyName as string | undefined;
        session.user.createdAt = token.createdAt as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
