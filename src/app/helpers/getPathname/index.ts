import { headers } from "next/headers";

const getPathname = async () => {
  const headersList = await headers();
  return headersList.get("x-current-path") || "";
};

export default getPathname;
