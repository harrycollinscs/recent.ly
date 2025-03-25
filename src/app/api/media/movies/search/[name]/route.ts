import Media from "@app/api/_models/media";
import handleSession from "@app/helpers/api/handleSession";
import mediaSearchAggregate from "@app/helpers/api/model/mediaSearchAggregate";
import getSession from "@app/helpers/getSession";
import dbConnect from "@app/lib/mongodb";
import { ObjectId } from "mongodb";

interface Params {
  name: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  await dbConnect();

  const { name } = await context.params;
  if (!name) Response.json({ status: 404 });

  try {
    const session = await getSession();
    await handleSession(session);

    const movies = await mediaSearchAggregate(
      Media,
      "movie",
      ObjectId.createFromHexString(session.user.id),
      name
    );
    return Response.json(movies, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
