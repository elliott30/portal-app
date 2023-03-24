import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  // Get the gumroad sale ids from the query parameter
  const query = req.query;
  const { product_id, product_permalink, sale_id } = query;

const data = {
    "product_id": product_id,
    "product_permalink" : product_permalink,
    "sale_id" : sale_id
      }

  // Optional logging to see the values
  console.log("Data: ", data);
  console.log("Sale ID: ", data.sale_id);

  try {


// Get license key
/* 

Guide: https://app.gumroad.com/api#licenses
Saved access token in env local: GUMROAD_ACCESS_TOKEN

curl https://api.gumroad.com/v2/sales/FO8TXN-dvxYabdavG97Y-Q== \
  -d "access_token=process.env.GUMROAD_ACCESS_TOKEN" \
  -X GET

  reponse.sale.license_key
*/

// Save to table with logged in user reference

res.redirect(307, "./../../create-page-new?paid=true")
//    res.status(200).json({ data })

  } catch (err) {
    res.status(300).json(err)
  }

}