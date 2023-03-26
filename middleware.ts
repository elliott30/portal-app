import { NextRequest, NextResponse } from 'next/server';
import { getHostnameDataOrDefault } from './lib/db';

export const config = {
  matcher: ['/', '/about', '/_sites/:path'],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = req.headers.get('host');

  console.log('Hostname:', hostname);

  // If localhost, assign the host value manually
  // If prod, get the custom domain/subdomain value by removing the root URL
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname!.replace(`.crm-sites.com`, '')
      : hostname === 'localhost:3000'
      ? ''
      : hostname!.replace(`.localhost:3000`, '');

  console.log('Current Host:', currentHost);

  // If the subdomain is 'www' or there is no subdomain, rewrite the URL to the index page outside the _sites folder
  if (currentHost === 'www' || currentHost === '') {
    console.log('www or no subdomain case');
    return NextResponse.rewrite(url);
  }

  const data = await getHostnameDataOrDefault(currentHost);

  console.log('Data:', data);

  // Show the 404 page if an unknown value is provided
  if (!data) {
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents.
  if (url.pathname.startsWith(`/_sites`)) {
    url.pathname = `/404`;
  } else {
    // Rewrite to the current subdomain under the pages/sites folder
    url.pathname = `/_sites/${data.subdomain}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
