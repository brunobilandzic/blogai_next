export async function GET(req) {
  console.log("check route");
  return Response.json({ message: "Blog parameters route is working."});
}
