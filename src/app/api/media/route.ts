import Media from "@app/api/_models/media";
import dbConnect from "@app/lib/mongodb";

const GET = async () => {
  await dbConnect();

  try {
    const tvshows = await Media.find({});
    return Response.json(tvshows, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
