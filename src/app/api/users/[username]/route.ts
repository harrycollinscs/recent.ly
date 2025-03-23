import Users from "@app/api/_models/user";
import handleSession from "@app/helpers/api/handleSession";
import getSession from "@app/helpers/getSession";
import dbConnect from "@app/lib/mongodb";
import { ObjectId } from "mongodb";

interface Params {
  username: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  const { username } = await context.params;

  try {
    await dbConnect();

    const session = await getSession();
    handleSession(session);
    const sessionUserId = await ObjectId.createFromHexString(session.user.id);

    const postsQuery = [
      { // retrieve all user posts from Post collection
        $lookup: {
          foreignField: "userId", // id of user being retrieved
          from: "posts",
          localField: "_id", // Session user id
          as: "posts", // array of matching documents
        },
      },
      { // for each post, get media entry and overwrite $posts
        $lookup: {
          foreignField: "_id", // id of item in Media collection
          from: "media",
          localField: "posts.mediaId", // id of media in Posts collection
          as: "posts",
        },
      },
    ];

    const followQuery = [
      {
        $lookup: {
          from: "follows",
          localField: "_id", // Session user id
          foreignField: "followingId", // id of user being retrieved
          pipeline: [{ $match: { followerId: sessionUserId } }], // ensure matching on session user
          as: "followDocument", // array of matching documents
        },
      },
      {
        $addFields: {
          isFollowedByCurrentUser: {
            $gt: [{ $size: "$followDocument" }, 0], // checks if size of array is 0
          },
        },
      },
    ];

    const user = await Users.aggregate([
      { $match: { username } },
      ...postsQuery,
      ...followQuery,
    ]);

    if (!user?.length) {
      return Response.json({ status: 404 });
    }

    return Response.json(user[0], { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
