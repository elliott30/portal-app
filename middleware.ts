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
  // (in the case of "subdomain-3.localhost:3000", "localhost:3000" is the root URL)
  // process.env.NODE_ENV === "production" indicates that the app is deployed to a production environment
  // process.env.VERCEL === "1" indicates that the app is deployed on Vercel
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname!.replace(`.crm-sites.com`, '')
      : hostname!.replace(`.localhost:3000`, '');

  const data = await getHostnameDataOrDefault(currentHost);

  // Redirect to a 404 page if an unknown value is provided
  if (!data) {
    return NextResponse.redirect('/404', 404);
  }

  // If the subdomain is 'www', redirect to the index page outside the _sites folder
  if (data.subdomain === 'www') {
    return NextResponse.redirect('/');
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
