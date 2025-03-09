import TvShows from "@app/api/_models/tvshow";
import dbConnect from "@app/lib/mongodb";

const POST = async (req: Request) => {
  return Response.json({ name: "Whats up" }, { status: 201 });
};

const GET = async () => {
  await dbConnect();

  try {
    const tvshows = await TvShows.find({});
    return Response.json(tvshows, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET, POST };
