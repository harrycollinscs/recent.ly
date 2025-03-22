import { ObjectId } from "mongodb";

const mediaSearchAggregate = async (model: any, user: any, searchValue: string) => {
  return await model.aggregate([
    {
      $match: {
        title: { $regex: searchValue, $options: "i" },
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
            ObjectId.createFromHexString(user.id), // The value you're checking
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
