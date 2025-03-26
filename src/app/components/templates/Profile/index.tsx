import ProfileMediaSection from "@app/components/organisms/ProfileMediaSection";
import ProfileHeader from "@app/components/organisms/ProfleHeader";
import { MoonLoader } from "react-spinners";
import "./Profile.styles.scss";

interface UserProfileProps {
  user: any;
}

const Profile = async ({ user }: UserProfileProps) => {
  const { all, albums, books, games, movies, tvshows } = user?.posts || {};

  const recentsItems = [
    albums?.[0],
    books?.[0],
    games?.[0],
    movies?.[0],
    tvshows?.[0],
  ].filter((item) => item);

  if (!user) {
    return <MoonLoader size={20} color="grey" loading={true} />;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <ProfileHeader user={user} isOwnProfile={user?.isCurrentUser} />
        <ProfileMediaSection title="Recents" items={recentsItems} />

        <ProfileMediaSection title="All" items={all} />

        <div style={{ display: "flex", gap: "2rem", width: "100%" }}>
          <ProfileMediaSection title="Movies" items={movies} />
          <ProfileMediaSection title="Tv Shows" items={tvshows} />
        </div>

        <div style={{ display: "flex", gap: "2rem", width: "100%" }}>
          <ProfileMediaSection title="Games" items={games} />
          <ProfileMediaSection title="Books" items={books} />
        </div>
      </div>
    </>
  );
};

export default Profile;
