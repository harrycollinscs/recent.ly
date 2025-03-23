import Media from "@app/api/_models/media";
import dbConnect from "@app/lib/mongodb";

const GET = async () => {
  await dbConnect();

  try {
    const albums = await Media.find({ type: "album" });
    return Response.json(albums, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
