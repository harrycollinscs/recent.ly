import Media from "@app/api/_models/media";
import dbConnect from "@app/lib/mongodb";
import { ObjectId } from "mongodb";

interface Params {
  id: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  await dbConnect();
  const { id } = await context.params;

  try {
    const albums = await Media.findOne({ _id: ObjectId.createFromHexString(id) });
    return Response.json(albums, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
