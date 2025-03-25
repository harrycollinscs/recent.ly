import Posts from "@app/api/_models/post";
import Users from "@app/api/_models/user";
import handleSession from "@app/helpers/api/handleSession";
import getSession from "@app/helpers/getSession";
import dbConnect from "@app/lib/mongodb";
import { ObjectId } from "mongodb";

const GET = async (req: Request) => {
  await dbConnect();

  try {
    const session = await getSession();
    handleSession(session);
    const sessionUserId = await ObjectId.createFromHexString(session.user.id);

    const users = await Users.aggregate([
      { $match: { _id: sessionUserId } },
      {
        $lookup: {
          foreignField: "followerId",
          from: "follows",
          localField: "_id",
          as: "following",
        },
      },
    ]);

    const User = users?.[0];
    if (!User) {
      return Response.json({ status: 404 });
    }

    const followingIds = User.following?.map(
      (following) => following.followingId
    );

    const posts = await Posts.aggregate([
      { $match: { userId: { $in: followingIds } } },
      {
        $lookup: {
          from: "media", // the media collection
          localField: "mediaId",
          foreignField: "_id",
          as: "media",
        },
      },
      { $unwind: "$media" },
      {
        $lookup: {
          foreignField: "_id",
          from: "users",
          localField: "userId",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          createdAt: 1,
          media: 1,
          user: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return Response.json(posts, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
