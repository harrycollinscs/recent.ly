import { ObjectId } from "mongodb";
// ObjectId.createFromHexString(

const mediaSearchAggregate = async (
  model: any,
  type: string | null,
  id: any,
  searchValue: string
) => {
  return await model.aggregate([
    {
      $match: {
        title: { $regex: searchValue, $options: "i" },
        ...(type ? { type } : {}),
      },
    },
    {
      $lookup: {
        from: "posts", // The name of the Post collection
        localField: "_id", // Movie._id, Album._id, Game._id etc etc
        foreignField: "mediaId", // Post.mediaId
        as: "userPosts", // This will create a new array of matching posts
      },
    },
    {
      $addFields: {
        hasUserPosted: {
          $in: [
            id, // The value you're checking
            {
              $map: {
                input: "$userPosts",
                as: "post",
                in: "$$post.userId", // Mapping userIds from the userPosts array
              },
            },
          ],
        },
      },
    },
  ]);
};

export default mediaSearchAggregate;
