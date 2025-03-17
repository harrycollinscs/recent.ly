import Books from "@app/api/_models/book";
import dbConnect from "@app/lib/mongodb";

interface Params {
  name: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  await dbConnect();

  const { name } = await context.params;

  if (!name) Response.json({ status: 404 });

  try {
    const books = await Books.find({
      title: { $regex: name, $options: "i" },
    });
    return Response.json(books, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
