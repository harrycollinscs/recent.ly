import Albums from "@app/api/_models/album";
import dbConnect from "@app/lib/mongodb";

interface Params {
  name: string;
}

const GET = async (req: Request, context: { params: Params }) => {
  await dbConnect();

  const { name } = await context.params;

  if (!name) Response.json({ status: 404 });

  try {
    const albums = await Albums.find({
      title: { $regex: name, $options: "i" },
    });
    return Response.json(albums, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { GET };
