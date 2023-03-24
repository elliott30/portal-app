import { unstable_getServerSession } from "next-auth/next";
import axios from "axios";
import { app, database } from "./firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GetAccessToken(req: any, res: any, authOptions: any) {
  console.log("API | access-token | GetAccessToken | START");

  const session: any = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    // Not signed in
    console.log("API | access-token | GetAccessToken | No session");
  }
  // Signed in

  // Debugging, log session object
  console.log(
    "API | access-token | GetAccessToken | Session",
    JSON.stringify(session, null, 2)
  );

  // Get access token from database
  // Use the user email from the session, to lookup the user id, which will then be used to lookup account
  console.log("API | access-token | GetAccessToken | Attempt to get user id from database");

  const userQuery = query(
    collection(database, "users"),
    where("email", "==", session.user.email)
  );
  const querySnapshot = await getDocs(userQuery);

  const doc = querySnapshot.docs[0];
  const userData = {
    id: doc.id,
    ...doc.data(),
  };

  if (!userData.id) {
    return { err: "No user found for session" };
  }

  console.log("API | access-token | GetAccessToken | UserID: ", userData.id)
  
  // Use the user id to lookup the account and access token property
  console.log("API | access-token | GetAccessToken | Attempt to get access token from account object in database");
  const accountsQuery = query(
    collection(database, "accounts"),
    where("userId", "==", userData.id)
  );
  const accountsQuerySnapshot = await getDocs(accountsQuery);
  const accountDoc = accountsQuerySnapshot.docs[0];

  let accessToken = {
    access_token: accountDoc.data().access_token,
    expires_at: accountDoc.data().expires_at,
    refresh_token: accountDoc.data().refresh_token,
  };

  console.log("API | access-token | GetAccessToken | Access token: ", accessToken);
  console.log("API | access-token | GetAccessToken | Date now: ", Date.now());
  console.log(
    "API | access-token | GetAccessToken | access_token expires_at",
    accessToken.expires_at
  );

  // If expired, get new access token

  if (Date.now() > accessToken.expires_at) {
    console.log(
      "API | access-token | GetAccessToken | UseRefreshToken to get new access token"
    );
    const refreshResponse: any = await UseRefreshToken(
      accountDoc.data().refresh_token
    );
    accessToken.access_token = refreshResponse.data.access_token;
    console.log("API | access-token | GetAccessToken | Updated token: ", accessToken);
  }

  return { accessToken };
}

export async function UseRefreshToken(refresh_token: string) {
  console.log("API | access-token | UseRefreshToken | START");

  // Get data submitted in request's body.
  console.log(
    "API | access-token | UseRefreshToken | Value recieved for refresh_token prop: ",
    refresh_token
  );
  // const pageName = req.body.pageName

  try {
    let config = {
      method: "post",
      url: "https://api.hubapi.com/oauth/v1/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      data: `grant_type=refresh_token&client_id=${process.env.HUBSPOT_CLIENT_ID}&client_secret=${process.env.HUBSPOT_CLIENT_SECRET}&refresh_token=${refresh_token}`,
    };

    let { data } = await axios(config);

    const new_access_token = data.access_token;

    console.log("API | access-token | UseRefreshToken | New access token:", {
      data: new_access_token,
    });
    console.log("API | access-token | UseRefreshToken | END SUCCESS");
    return { data };
  } catch (err) {
    console.log("API | access-token | UseRefreshToken | END ERROR", err);
    return { err: err };
  }
}
