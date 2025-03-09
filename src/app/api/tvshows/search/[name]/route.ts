import TvShows from "@app/api/_models/tvshow";
import dbConnect from "@app/lib/mongodb";

interface Params {
  name: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  await dbConnect();

  const { name } = await context.params;

  if (!name) Response.json({ status: 404 });

  try {
    const regex = new RegExp(`^${name}`);
    const tvshows = await TvShows.find({
      title: { $regex: regex, $options: "i" },
    });
    return Response.json(tvshows, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
