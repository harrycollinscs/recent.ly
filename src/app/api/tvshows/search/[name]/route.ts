import TvShows from "@app/api/_models/tvshow";
import handleSession from "@app/helpers/api/handleSession";
import mediaSearchAggregate from "@app/helpers/api/model/mediaSearchAggregate";
import getSession from "@app/helpers/getSession";
import dbConnect from "@app/lib/mongodb";

interface Params {
  name: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  await dbConnect();
  const session = await getSession();
  handleSession(session);

  const { name } = await context.params;
  if (!name) Response.json({ status: 404 });

  try {
    const tvshows = await mediaSearchAggregate(TvShows, session?.user, name);
    return Response.json(tvshows, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
