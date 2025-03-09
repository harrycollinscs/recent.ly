import Games from "@app/api/_models/game";
import dbConnect from "@app/lib/mongodb";

const POST = async (req: Request) => {
  return Response.json({ name: "Whats up" }, { status: 201 });
};

const GET = async () => {
  await dbConnect();

  try {
    const games = await Games.find({});
    return Response.json(games, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET, POST };
