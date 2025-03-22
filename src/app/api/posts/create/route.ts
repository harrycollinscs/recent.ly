import Post from "@app/api/_models/post";
import handleSession from "@app/helpers/api/handleSession";
import getSession from "@app/helpers/getSession";
import dbConnect from "@app/lib/mongodb";

interface Params {
  mediaId: any;
  type: string;
}

const POST = async (req: Request, context: { params: Params }) => {
  await dbConnect();
  const session = await getSession();
  handleSession(session);

  const { mediaId, type } = await req.json();

  try {
    // let Model = await import(`@app/api/_models/${type}`);

    const createdPost = Post.create({
      userId: session.user.id,
      mediaId,
      type,
      createdAt: new Date(),
    });

    return Response.json(createdPost, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};

export { POST };
