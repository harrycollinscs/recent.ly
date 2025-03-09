import Books from "@app/api/_models/book";
import dbConnect from "@app/lib/mongodb";

const POST = async (req: Request) => {
  return Response.json({ name: "Whats up" }, { status: 201 });
};

const GET = async () => {
  await dbConnect();

  try {
    const books = await Books.find({});
    return Response.json(books, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET, POST };
