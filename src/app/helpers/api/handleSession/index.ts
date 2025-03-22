import getSession from "@app/helpers/getSession";

const handleSession = (session: any) => {
  if (!session) {
    return Response.json({
      message: "You must be logged in to follow a user.",
      status: 401,
    });
  }
};

export default handleSession;
