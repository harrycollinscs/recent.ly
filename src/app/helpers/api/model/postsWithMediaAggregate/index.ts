import Posts from "@app/api/_models/post";

const postsWithMediaAggregate = async (type: string | null, user: any) => {
  return await Posts.aggregate([
    { $match: { userId: user._id, ...(type ? { type } : {}) } },
    {
      $lookup: {
        from: "media", // the media collection
        localField: "mediaId",
        foreignField: "_id",
        as: "media",
      },
    },
    { $unwind: "$media" }, // Flatten the media array
    {
      $project: {
        createdAt: 1,
        media: 1,
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
};

export default postsWithMediaAggregate;
