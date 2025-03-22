import Users from "@app/api/_models/user";
import handleSession from "@app/helpers/api/handleSession";
import getSession from "@app/helpers/getSession";
import dbConnect from "@app/lib/mongodb";
import { ObjectId } from "mongodb";

interface Params {
  username: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  await dbConnect();
  const session = await getSession();
  handleSession(session);

  const { username } = await context.params;
  const sessionUserId = await ObjectId.createFromHexString(session.user.id);

  try {
    const user = await Users.aggregate([
      { $match: { username } },
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
