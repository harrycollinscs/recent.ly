"use client";
import "./User.styles.scss";
import { auth } from "@app/lib/auth";
import CTA from "@app/components/atoms/CTA";
import handleFollowUser from "@app/helpers/handleFollowUser";
import { authClient } from "@app/lib/auth-client";
import { use, useEffect, useState } from "react";

interface UserProfileProps {
  params: Promise<{ username: string }>;
}

const UserProfile = ({ params }: UserProfileProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false)
  const [profileUser, setProfileUser] = useState(undefined);
  const { username } = use(params);

  const {
    data: session,
    isPending,
    error: sessionError,
    refetch,
  } = authClient.useSession();

  const isOwnProfile = session?.user?.username === username;

  const fetchProfileUser = async () => {
    const profileUserResponse = await fetch(
      `/api/users/${username}`
    );

    if (profileUserResponse?.status && profileUserResponse.status !== 200) {
      setHasError(true)
    }

    const user = await profileUserResponse.json();
    setProfileUser(user);
    setIsLoading(false)
  };

  useEffect(() => {
    fetchProfileUser();
  }, []);



  if (isLoading || isPending) {
    return <p>Loading...</p>;
  }

  if (!profileUser || hasError) {
    return <h1>User not found</h1>;
  }

  return (
    <div className="header">
      <div className="user">
        <img src={profileUser.image} />
        <h1>{profileUser.username}</h1>
      </div>

      <div
        className="follow-container"
        style={{ display: "flex", flexDirection: "row", gap: "5rem" }}
      >
        <div>
          <h3>Following</h3>
          <p>{profileUser.following?.length}</p>
        </div>

        <div>
          <h3>Followers</h3>
          <p>{profileUser.followers?.length}</p>
        </div>
      </div>

      {!isOwnProfile && (
        <div className="follow-cta-container">
          <CTA
            text="Follow"
            appearance="secondary"
            onClick={() => handleFollowUser(profileUser._id)}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
