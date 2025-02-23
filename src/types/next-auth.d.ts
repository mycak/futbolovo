import { IUser } from './common';

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: IUser; // Now session.user has all IUser fields
  }

  interface User extends IUser {} // Ensures `user` in authorize() has correct fields
}
