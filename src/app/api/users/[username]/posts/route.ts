import Posts from "@app/api/_models/post";
import handleSession from "@app/helpers/api/handleSession";
import getSession from "@app/helpers/getSession";
import dbConnect from "@app/lib/mongodb";
import { ObjectId } from "mongodb";

const GET = async () => {
  await dbConnect();

  try {
    const session = await getSession();
    handleSession(session);
    const sessionUserId = await ObjectId.createFromHexString(session.user.id);

    // const groupedDocuments = await Posts.aggregate([
    //   {
    //     $group: {
    //       _id: "$type", // Group by 'type' field
    //       documents: { $push: "$$ROOT" }, // Push all documents into an array for each type
    //     },
    //   },
    //   {
    //     $sort: { createdAt: 1 }, // Optionally, sort by type (ascending order)
    //   },
    // ]);

    // groupedDocuments.forEach(async ({ _id, documents }) => {
    //   // documents.forEach()
    //   const Model = await import(`@app/api/_models/${_id}`);
    //   const mediaIds = documents.map((document: any) => document._id);

    //   console.log({Model})
    //   console.log({mediaIds})
    //   const media = await Model.findOne()
    //   // const media = await Model.find(
    //   //   {
    //   //     _id: {
    //   //       $in: [mediaIds],
    //   //     },
    //   //   },
    //   //   function (err, docs) {
    //   //     console.log(docs);
    //   //   }
    //   // ).exec();

    //   console.log({media})
    // });

    // console.log({ groupedDocuments });

    const posts = await Posts.aggregate([
      {
        $match: { userId: sessionUserId },
      },
      {
        $lookup: {
          foreignField: "_id", // id of user being retrieved
          from: "movies",
          localField: "mediaId", // Session user id
          as: "movies", // array of matching documents
        },
      },
    ]);

    console.log({posts})

    return Response.json(posts, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
