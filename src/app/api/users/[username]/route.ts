import Users from "@app/api/_models/user";
import handleSession from "@app/helpers/api/handleSession";
import postsWithMediaAggregate from "@app/helpers/api/model/postsWithMediaAggregate";
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
      { $unset: "followDocument" },
    ];

    const users = await Users.aggregate([
      { $match: { username } },
      ...followQuery,
    ]);

    const user = users?.[0];
    if (!user) {
      return Response.json({ status: 404 });
    }

    // TODO move into separate call hmmm
    user.isCurrentUser = user._id.equals(sessionUserId);
    user.posts = {
      all: await postsWithMediaAggregate(null, user),
      movies: await postsWithMediaAggregate("movie", user),
      tvshows: await postsWithMediaAggregate("tvshow", user),
      albums: await postsWithMediaAggregate("album", user),
      games: await postsWithMediaAggregate("game", user),
      books: await postsWithMediaAggregate("book", user)
    };

    return Response.json(user, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
