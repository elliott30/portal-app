import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

interface User {
  email: string;
  role: string;
}

async function batchCreateUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { users }: { users: User[] } = req.body;

    if (!users || !Array.isArray(users)) {
      return res.status(400).json({ error: "Invalid user data." });
    }

    const { data, error } = await supabase.from("users").insert(users);

    if (error) {
      throw error;
    }

    console.log("Batch users created:", data);
    res.status(200).json({ message: "Batch users created successfully." });
  } catch (error: Error | unknown) {
    console.error("Error batch creating users:", (error as Error).message);
  }
  
}

export default batchCreateUsers;
