'use server';

import { auth } from '@/lib/auth';
import { RegisterFormValues } from '@/components/auth/signup-form';
import { LoginFormValues } from '@/components/auth/login';

export async function registerUser(data: RegisterFormValues) {
  try {
    // call the regiter API endpoint to sign up the user by email
    await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
      },
    });
    return {
      success: true,
      message: 'User registered successfully',
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Registration failed. Please try again later.');
  }
}

export async function loginUser(data: LoginFormValues) {
  try {
    // call the login API endpoint to sign in the user by email
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    return {
      success: true,
      message: 'User logged in successfully',
    };
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Login failed. Please try again later.');
  }
}
