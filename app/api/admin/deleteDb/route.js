import dbConnect from "@/lib/db/mongooseConnect";
import mongoose from "mongoose";

export async function DELETE(req) {
  try {
    await dbConnect();
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    for (const collection of collections) {
      await mongoose.connection.db.dropCollection(collection.name);
    }
    return new Response(
      JSON.stringify({
        message: "All collections deleted successfully",
        collections,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting collections",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
