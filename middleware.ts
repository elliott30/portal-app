import { NextRequest, NextResponse } from 'next/server';
import { getHostnameDataOrDefault } from './lib/db';

export const config = {
  matcher: ['/', '/about', '/_sites/:path'],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = req.headers.get('host');

  // If localhost, assign the host value manually
  // If prod, get the custom domain/subdomain value by removing the root URL
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname!.replace(`.crm-sites.com`, '')
      : hostname!.replace(`.localhost:3000`, '');

  const data = await getHostnameDataOrDefault(currentHost);

  // Show the 404 page if an unknown value is provided
  if (!data) {
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }

  // If the subdomain is 'www', rewrite the URL to the index page outside the _sites folder
  if (data.subdomain === 'www') {
    // No need to modify the url.pathname since it's already pointing to the desired location
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
