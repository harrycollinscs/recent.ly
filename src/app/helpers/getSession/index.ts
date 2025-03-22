import { auth } from "@app/lib/auth";
import { headers as getHeaders } from "next/headers";

const getSession = async () => {
  const headers = await getHeaders();
  return await auth.api.getSession({ headers });
};

export default getSession;
