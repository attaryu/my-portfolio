'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'node:fs/promises';
import path from 'node:path';

import { makeToken } from '@/utils/jwt';

const credentialFilePath = path.resolve('storages', 'credentials.txt');

export async function authenticationAction(
  _prevState: { error: boolean; message: string },
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
      message: 'Kredensial tidak sesuai, ulangi lagi!',
    };
  }

  const token = await makeToken();

  await fs.writeFile(credentialFilePath, token);

  cookies().set('auth', token, {
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24,
  });

  return redirect('/admin');
}

export async function logoutAction() {
  try {
    await fs.access(credentialFilePath);
    await fs.unlink(credentialFilePath);

    cookies().delete('auth');
  } catch {}

  return;
}
