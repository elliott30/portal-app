import { unstable_getServerSession } from "next-auth/next";
import axios from "axios";
import { GetAccessToken } from "../../../components/access-token";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { PageConfig } from "../../../components/page-config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API | projects-create | START");

  // Get data submitted in request's body.
  console.log("API | projects-create | Request body: ", req.body);

  const pageName = req.body.pageName;
  const colorHex = req.body.colorHex;

  console.log("API | projects-create | pageName: ", pageName);
  console.log("API | projects-create | colorHex: ", colorHex);

  // Guard clause checks for form field values,
  if (!pageName || !colorHex) {
    // Sends a HTTP bad request error code
    return res
      .status(400)
      .json({ custom_message: "API | projects-create | Missing form data" });
  }

  // Guard clause check for session
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    // Not signed in
    console.log("API | projects-create | No session");
    return res
      .status(403)
      .json({ custom_message: "API | projects-create | No session found" });
  }

  try {
    // Get HubSpot Private App access token from logged in users 
    console.log(
      "API | projects-create | Attempt to get access token");
    const getAccessTokenResponse = await GetAccessToken(req, res, authOptions);
    console.log(
      "API | projects-create | getAccessTokenResponse object from GetAccessToken component:",
      getAccessTokenResponse
    );
    const accessToken = getAccessTokenResponse.accessToken!.access_token;
    console.log(
      "API | projects-create | Access token property from getAccessTokenResponse object:",
      accessToken
    );

    // Publish page

    let pageConfig = PageConfig(pageName, colorHex);

    let config = {
      method: "post",
      url: "https://api.hubapi.com/cms/v3/pages/landing-pages",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: pageConfig,
    };

    let { data } = await axios(config);
    data = [
      {
        id: data.id,
        url: `https://app.hubspot.com/content/12345678/edit/${data.id}/content`,
        //       "url": `https://app.hubspot.com/content/${hubId}/edit/${data.id}/content`
      },
    ];
    console.log("API | projects-create | Page detail response from HubSpot API:", {
      data,
    });
    res.status(200).json({ data });
    console.log("API | projects-create | END SUCCESS");
  } catch (err) {
    // console.log(err)
    console.log("API | projects-create | END ERROR");
    return res
      .status(400)
      .json({
        custom_message:
          "API | projects-create | Get access token or create page api error",
      });
  }
}
