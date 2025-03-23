import Media from "@app/api/_models/media";
import dbConnect from "@app/lib/mongodb";

const GET = async () => {
  await dbConnect();

  try {
    const games = await Media.find({ type: "game" });
    return Response.json(games, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
