import { jwtVerify, SignJWT } from 'jose';

const encodedSecretKey = new TextEncoder().encode(
  process.env.SECRET_KEY as string,
);

export async function makeToken() {
  return await new SignJWT({
    message:
      'Assalamualaikum kawan, ada apakah gerangan sehingga token ini didecode? :D',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(encodedSecretKey);
}

export async function verifyToken(token: string) {
  return await jwtVerify(token, encodedSecretKey);
}
