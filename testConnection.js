import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

try {
  await client.connect();
  console.log("✅ Connected to MongoDB");
} catch (err) {
  console.error("❌ Connection failed:", err);
} finally {
  await client.close();
}
