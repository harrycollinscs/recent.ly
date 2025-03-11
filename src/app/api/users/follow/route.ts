import Follows from "@app/api/_models/follow";
import Users from "@app/api/_models/user";
import { auth } from "@app/lib/auth";
import dbConnect from "@app/lib/mongodb";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";

const POST = async (req: Request, res: Response) => {
  await dbConnect();
  const { userId } = (await req.json()) || {};

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({
      message: "You must be logged in to follow a user.",
      status: 401,
    });
  }

  try {
    const followerUserId = await ObjectId.createFromHexString(userId);
    const followingUserId = await ObjectId.createFromHexString(session.user.id);

    await Follows.create({
      followerId: followerUserId,
      followingId: followingUserId,
    });

    await Users.findOneAndUpdate(
      { _id: session.user.id },
      { $inc: { followingCount: 1 } }
    );

    await Users.findOneAndUpdate(
      { _id: userId },
      { $inc: { followerCount: 1 } }
    );

    return Response.json({}, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { POST };
