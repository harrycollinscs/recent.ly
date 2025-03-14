import { authClient } from "@app/lib/auth-client";
import ProfileHeader from "./ProfileHeader";
import "./User.styles.scss";
import { headers as getHeaders } from "next/headers";
import getPathname from "@app/helpers/getPathname";
import { auth } from "@app/lib/auth";

interface UserProfileProps {
  params: Promise<{ username: string }>;
}

const UserProfile = async ({ params }: UserProfileProps) => {
  const pathname = await getPathname();
  const headers = await getHeaders();

  const session = await auth.api.getSession({ headers });

  const user = await (
    await fetch(`${process.env.BASE_URL}/api${pathname}`, { headers }) || {}
  ).json();

  const isOwnProfile = session?.user?.username === user?.username;

  return (
    <>
      <ProfileHeader
        user={user}
        isOwnProfile={isOwnProfile}
        // refetchUser={fetchProfileUser}
      />
    </>
  );
};

export default UserProfile;
