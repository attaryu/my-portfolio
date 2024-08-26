import { RequestInit } from 'next/dist/server/web/spec-extension/request';

export default async function fetcher(url: string, options: RequestInit = {}) {
  return await fetch(process.env.NEXT_PUBLIC_CMS_REQUEST_URL + '/api' + url, {
    ...options,
    headers: { 'Authorization': `bearer ${process.env.NEXT_PUBLIC_CMS_API_TOKEN}` },
  })
    .then((res) => res.json())
    .catch((res) => console.error(res));
}
