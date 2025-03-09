import Games from "@app/api/_models/game";
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
    const games = await Games.find({
      title: { $regex: regex, $options: "i" },
    });
    return Response.json(games, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
