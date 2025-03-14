import Follows from "@app/api/_models/follow";
import Users from "@app/api/_models/user";
import { auth } from "@app/lib/auth";
import dbConnect from "@app/lib/mongodb";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { headers } from "next/headers";

const POST = async (req: Request, res: Response) => {
  await dbConnect();
  const { userId } = (await req.json()) || {};

  const dbSession = await mongoose.startSession();
  dbSession.startTransaction(); // Start a transaction

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
    const followerUserId = await ObjectId.createFromHexString(session.user.id);
    const followingUserId = await ObjectId.createFromHexString(userId);

    const existingFollow = await Follows.findOne({
      followerId: followerUserId,
      followingId: followingUserId,
    }).exec();

    if (!existingFollow) {
      await dbSession.abortTransaction();
      Response.json({ status: 400, message: "Not following this user" });
    }

    await existingFollow.deleteOne().exec();

    const followingCount = (
      await Follows.find({ followerId: followerUserId }).exec()
    )?.length;
    const followerCount = (
      await Follows.find({ followingId: followingUserId }).exec()
    )?.length;

    await Users.findOneAndUpdate(
      { _id: session.user.id },
      { followingCount }
    ).exec();

    await Users.findOneAndUpdate({ _id: userId }, { followerCount }).exec();

    await dbSession.commitTransaction();

    return Response.json({}, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { POST };
