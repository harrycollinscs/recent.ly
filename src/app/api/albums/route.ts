import dbConnect from "@app/lib/mongodb";
import Albums from '@app/api/_models/album';


const POST = async (req: Request) => {
  return Response.json({ name: "Whats up" }, { status: 201 });
};

const GET = async () => {
  await dbConnect();

  try {
    const albums = await Albums.find({});    
    return Response.json(albums, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { POST, GET };
