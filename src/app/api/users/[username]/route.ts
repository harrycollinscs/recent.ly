import Follows from "@app/api/_models/follow";
import Users from "@app/api/_models/user";
import { auth } from "@app/lib/auth";
import dbConnect from "@app/lib/mongodb";
import { headers as getHeaders } from "next/headers";

interface Params {
  username: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  await dbConnect();
  const { username } = await context.params;

  const headers = await getHeaders()
  const session = await auth.api.getSession({ headers });

  if (!session) {
    return Response.json({
      message: "You must be logged in to follow a user.",
      status: 401,
    });
  }

  try {
    const user = await Users.findOne(
      { username },
      { password: 0, email: 0, name: 0 }
    ).exec();

    const follow = await Follows.findOne({
      followerId: session.user.id,
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
