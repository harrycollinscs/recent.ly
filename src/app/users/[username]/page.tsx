import ProfileHeader from "@app/components/organisms/ProfleHeader";
import RecentsSection from "@app/components/organisms/ProfileMediaSection";
import getPathname from "@app/helpers/getPathname";
import { auth } from "@app/lib/auth";
import { headers as getHeaders } from "next/headers";
import { notFound } from "next/navigation";
import "./User.styles.scss";
import ProfileMediaSection from "@app/components/organisms/ProfileMediaSection";

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

  const recentsItems = [
    albums?.[0],
    books?.[0],
    games?.[0],
    movies?.[0],
    tvshows?.[0],
  ].filter((item) => item);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <ProfileHeader user={user} isOwnProfile={user.isCurrentUser} />
        <ProfileMediaSection title="Recents" items={recentsItems} />

        <div style={{ display: "flex", gap: "2rem", width: '100%' }}>
          <ProfileMediaSection title="Movies" items={movies} />
          <ProfileMediaSection title="Tv Shows" items={tvshows} />
        </div>

        <div style={{ display: "flex", gap: "2rem", width: '100%' }}>
          <ProfileMediaSection title="Games" items={games} />
          <ProfileMediaSection title="Books" items={books} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
