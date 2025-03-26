import Profile from "@app/components/templates/Profile";
import getPathname from "@app/helpers/getPathname";
import { headers as getHeaders } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MoonLoader } from "react-spinners";

interface UserProfileProps {
  params: Promise<{ username: string }>;
}

const UserProfile = async ({ params }: UserProfileProps) => {
  const pathname = await getPathname();
  const headers = await getHeaders();

  const user = await (
    (await fetch(`${process.env.BASE_URL}/api${pathname}`, { headers })) || {}
  ).json();

  if (user && user.status === 404) {
    return notFound();
  }

  return (
    <Suspense key={pathname} fallback={<MoonLoader size={20} color="grey" loading={true} />}>
      <Profile user={user} />
    </Suspense>
  );
};

export default UserProfile;
