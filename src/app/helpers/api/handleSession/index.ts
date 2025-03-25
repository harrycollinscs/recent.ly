import getSession from "@app/helpers/getSession";

const handleSession = async (session: any) => {
  if (!session) {
    throw {
      message: "You must be logged in to do that!.",
      status: 401,
    };
  }
  return true;
};

export default handleSession;
