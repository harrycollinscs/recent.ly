import getPathname from "@app/helpers/getPathname";
import { auth } from "@app/lib/auth";
import { headers as getHeaders } from "next/headers";
import "./User.styles.scss";
import ProfileHeader from "@app/components/organisms/ProfleHeader";
import RecentsSection from "@app/components/organisms/RecentsSection";

interface UserProfileProps {
  params: Promise<{ username: string }>;
}

const UserProfile = async ({ params }: UserProfileProps) => {
  const pathname = await getPathname();
  const headers = await getHeaders();

  const session = await auth.api.getSession({ headers });

  const user = await (
    (await fetch(`${process.env.BASE_URL}/api${pathname}`, { headers })) || {}
  ).json();

  const isOwnProfile = session?.user?.username === user?.username;

  return (
    <>
      <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
      <div style={{ marginTop: "2rem" }}>
        <RecentsSection />
      </div>
    </>
  );
};

export default UserProfile;
