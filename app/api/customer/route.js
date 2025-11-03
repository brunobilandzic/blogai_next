import { getSession } from "next-auth/react";

export async function GET(req, res) {
    
    const url = new URL(req.url);
    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    return new Response("Customer API is working");
}