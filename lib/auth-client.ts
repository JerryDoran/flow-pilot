import { createAuthClient } from 'better-auth/react'; // make sure to import from better-auth/react

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  // baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
});
