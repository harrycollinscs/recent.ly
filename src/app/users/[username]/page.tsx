import getPathname from "@app/helpers/getPathname";
import { auth } from "@app/lib/auth";
import { headers as getHeaders } from "next/headers";
import "./User.styles.scss";
import ProfileHeader from "@app/components/organisms/ProfleHeader";
import RecentsSection from "@app/components/organisms/RecentsSection";
import { notFound } from "next/navigation";

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

  if (!user) return notFound();

  const { all, albums, books, games, movies, tvshows } = user.posts || {};

  return (
    <>
      <ProfileHeader user={user} isOwnProfile={user.isCurrentUser} />
      <div style={{ marginTop: "2rem" }}>
        <RecentsSection
          album={albums?.[0]}
          book={books?.[0]}
          game={games?.[0]}
          movie={movies?.[0]}
          tvshow={tvshows?.[0]}
        />
      </div>
    </>
  );
};

export default UserProfile;
