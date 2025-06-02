'use server';

import { auth } from '@/lib/auth';
import { RegisterFormValues } from '@/components/auth/signup-form';
import { LoginFormValues } from '@/components/auth/login';
import { APIError } from 'better-auth/api';

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
    console.error('Error during registration:', error);
    if (error instanceof APIError) {
      console.log('API Error:', error.message, error.status);
      // Handle specific API errors - can use switch statement for more cases
      if (error.status === 'UNPROCESSABLE_ENTITY') {
        throw new Error(
          error.message || 'That user already exists. Please try another.'
        );
      }
    } else {
      console.error('Unexpected error during registration:', error);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
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
    if (error instanceof APIError) {
      console.log('API Error:', error.message, error.status);
      // Handle specific API errors - can use switch statement for more cases
      if (error.status === 'UNAUTHORIZED') {
        throw new Error(
          error.message || 'Invalid email or password. Please try again.'
        );
      }
    } else {
      console.error('Unexpected error during login:', error);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
}
