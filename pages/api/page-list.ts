// HubSpot app settings accounts fetch
// https://developers.hubspot.com/docs/api/create-an-app-settings-page

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    res
      .status(200)
      .json({"response":{"iframeUrl":"https://en.wikipedia.org/wiki/Flywheel"}});
}
