import dbConnect from "@app/lib/mongodb";
import Users from "@app/api/_models/user";

// TODO remove eventually or make private
const GET = async () => {
  await dbConnect();

  try {
    const users = await Users.find({}, { password: 0, email: 0, name: 0 });
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
