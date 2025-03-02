import Users from "@app/api/_models/user";
import dbConnect from "@app/lib/mongodb";

interface Params {
  username: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  await dbConnect();
  const { username } = await context.params;

  if (!username) Response.json({ status: 404 });

  try {
    const regex = new RegExp(`^${username}`)
    const users = await Users.find({
      username: { $regex: regex, $options: "i" },
    });
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
