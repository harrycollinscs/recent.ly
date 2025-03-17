import Post from "@app/api/_models/post";
import { auth } from "@app/lib/auth";
import dbConnect from "@app/lib/mongodb";
import { headers as getHeaders } from "next/headers";

interface Params {
  mediaId: any;
  type: string;
}

const POST = async (req: Request, context: { params: Params }) => {
  await dbConnect();
  const { mediaId, type } = await req.json();

  const headers = await getHeaders();
  const session = await auth.api.getSession({ headers });

  if (!session) {
    return Response.json({
      message: "You must be logged in to follow a user.",
      status: 401,
    });
  }

  try {
    let Model = await import(`@app/api/_models/${type}`);

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
