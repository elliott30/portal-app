import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto"

export function signatureCheckV3(req: NextApiRequest): boolean {

  console.log("signatureCheckV3 | START");

  const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
  const method = req.method;

  const signature = req.headers['x-hubspot-signature-v3'];
  const timestamp = req.headers['x-hubspot-request-timestamp'];
  
  if (!signature || !timestamp) {
    console.log('signatureCheckV3 | Missing signature or timestamp')
    return false;
  };

  const isWithinFiveMinutes = isAllowedDelay(timestamp);

  if (!isWithinFiveMinutes) {
    console.log('signatureCheckV3 | Timestamp is too old')
    return false;
  };

  let uri = `https://${req.headers.host}${req.url!}`;
  uri = reorderQueryParams(uri);
  uri = decodeUrl(uri);
  const sourceString:string = method + uri + timestamp;  
  const hmac = crypto.createHmac('sha256', clientSecret!);
  hmac.update(sourceString);
  const calculatedSignature = hmac.digest('base64');

  if (calculatedSignature !== signature) {
    console.log("signatureCheckV3 | Invalid signature",{
      "sourceString": sourceString,
      "expectedSignature": calculatedSignature,
      "signature": signature
    })
    return false;
  }
  console.log("signatureCheckV3 | SUCCESS")
  return true;
}

const isAllowedDelay = (timestamp: any) => {
  const timestampInMs = parseInt(timestamp);
  const now = Date.now();
  const fiveMinutesAgo = now - (5 * 60 * 1000);
  return timestampInMs > fiveMinutesAgo;
}

const decodeUrl = (str: string) => {
return str.replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%3F/g, '?')
    .replace(/%40/g, '@')
    .replace(/%21/g, '!')
    .replace(/%24/g, '$')
    .replace(/%27/g, "'")
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%2A/g, '*')
    .replace(/%2C/g, ',')
    .replace(/%3B/g, ';')
}

function reorderQueryParams(reqUrl: string): string {
const parsedUrl = new URL(reqUrl);
const searchParams = new URLSearchParams(parsedUrl.search);
const sortedParams = {
    actionType: searchParams.get("actionType"),
    portalId: searchParams.get("portalId"),
    userId: searchParams.get("userId"),
    userEmail: searchParams.get("userEmail"),
    appId: searchParams.get("appId"),
    accountId: searchParams.get("accountId"),
}
for (const key of Object.keys(sortedParams)) {
  searchParams.delete(key);
}
for (const [key, value] of Object.entries(sortedParams)) {
  searchParams.append(key, value!);
}
parsedUrl.search = searchParams.toString();
return parsedUrl.toString();
}