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
    const user = await Users.findOne(
      { username },
      { password: 0, email: 0, name: 0 }
    );

    if (!user) {
      return Response.json({ status: 404 });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
