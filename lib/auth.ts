import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from '@/lib/generated/prisma';
import db from '@/prisma/db';
import { nextCookies } from 'better-auth/next-js';

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 64,
    autoSignIn: true,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.name.split(' ')[0],
          lastName: profile.name.split(' ')[1],
        };
      },
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
  },
  // Extend the user model with additional fields that I defined in the Prisma schema
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'USER',
        input: false, // don't allow user to set role
      },
      firstName: {
        type: 'string',
        required: true,
      },
      lastName: {
        type: 'string',
        required: true,
      },
    },
  },
  plugins: [nextCookies()],
});
