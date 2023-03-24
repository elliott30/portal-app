// HubSpot app settings accounts fetch
// https://developers.hubspot.com/docs/api/create-an-app-settings-page

import type { NextApiRequest, NextApiResponse } from "next"
import { headers } from 'next/headers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    res
      .status(200)
      .json(
        {
        "response": {
          "accounts": [
            { 
              "accountId": "abc123",
              "accountName": "Joe Cool"
            }
          ]
        }
      });
}






