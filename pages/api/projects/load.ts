import type { NextApiRequest, NextApiResponse } from "next"
import { app, database } from "../../../components/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    
    console.log("pages/load | START");

    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
      // Signed in
      console.log("Signed in, session", JSON.stringify(session, null, 2))

  const pageQuery = await query(
    collection(database, "pages"),
    // where("email", "==", session!.user?.email)
  );
  console.log("page-list | GetPages | userQuery | ", pageQuery);

  const querySnapshot = await getDocs(pageQuery);
   console.log("page-list | GetPages | querySnapshot | ", querySnapshot);

  const pages = querySnapshot.docs.map(doc => doc.data())
  console.log("api/projects/load | pages array | ", pages);

  return res.status(200).json(pages);


} else {
  // Not Signed in
  console.log("api/projects/load | Not signed in")
  res.status(401)
}
res.end()


  };


  //

  