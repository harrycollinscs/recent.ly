import Movies from "@app/api/_models/movie";
import dbConnect from "@app/lib/mongodb";

const POST = async (req: Request) => {
  return Response.json({ name: "Whats up" }, { status: 201 });
};

const GET = async () => {
  await dbConnect();

  try {
    const movies = await Movies.find({});
    return Response.json(movies, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET, POST };
