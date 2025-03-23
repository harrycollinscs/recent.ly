import Media from "@app/api/_models/media";
import dbConnect from "@app/lib/mongodb";

const GET = async () => {
  await dbConnect();

  try {
    const books = await Media.find({ type: "book" });
    return Response.json(books, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
