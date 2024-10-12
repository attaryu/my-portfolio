'use server';

import { cookies } from 'next/headers';

import { makeToken } from '@/utils/jwt';

export async function authenticationAction(
  _prevState: { error: boolean; message: string } | null,
  form: FormData,
) {
  const credentials = {
    email: form.get('email'),
    password: form.get('password'),
  };

  if (
    credentials.email !== process.env.ADMIN_EMAIL ||
    credentials.password !== process.env.ADMIN_PASSWORD
  ) {
    return {
      error: true,
      message: 'The credentials are not match, try again!',
    };
  }

  const token = await makeToken();

  cookies().set('auth', token, {
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24,
  });

  return {
    error: false,
    message: 'Success!'
  };
}

export async function logoutAction() {
  cookies().delete('auth');
}
