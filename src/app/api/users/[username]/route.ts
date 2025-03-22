import Follows from "@app/api/_models/follow";
import Users from "@app/api/_models/user";
import handleSession from "@app/helpers/api/handleSession";
import getSession from "@app/helpers/getSession";
import dbConnect from "@app/lib/mongodb";

interface Params {
  username: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  await dbConnect();
  const session = await getSession();
  handleSession(session);

  const { username } = await context.params;

  try {
    const user = await Users.findOne(
      { username },
      { password: 0, email: 0, name: 0 }
    ).exec();

    const follow = await Follows.findOne({
      followerId: session?.user.id,
      followingId: user.id,
    }).exec();

    if (!user) {
      return Response.json({ status: 404 });
    }

    return Response.json(
      { ...user.toObject(), isFollowedByCurrentUser: !!follow },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
