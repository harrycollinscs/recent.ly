"use client";
import CTA from "@app/components/atoms/CTA";
import handleFollowUser from "@app/helpers/handleFollowUser";
import handleUnfollowUser from "@app/helpers/handleUnfollowUser";
import { authClient } from "@app/lib/auth-client";
import { use, useEffect, useState } from "react";
import "./User.styles.scss";

interface UserProfileProps {
  params: Promise<{ username: string }>;
}

const UserProfile = ({ params }: UserProfileProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [profileUser, setProfileUser] = useState(undefined);
  const { username } = use(params);

  const {
    data: session,
    isPending: sessionIsPending,
    error: sessionError,
    refetch,
  } = authClient.useSession();

  const isOwnProfile = session?.user?.username === username;

  const fetchProfileUser = async () => {
    const profileUserResponse = await fetch(`/api/users/${username}`);

    if (profileUserResponse?.status && profileUserResponse.status !== 200) {
      setHasError(true);
    }

    const user = await profileUserResponse.json();
    setProfileUser(user);
    setIsLoading(false);
  };

  const handleFollowAction = async (method: any) => {
    setIsPending(true);
    await method(profileUser._id);
    await fetchProfileUser();
    setIsPending(false);
  };

  useEffect(() => {
    fetchProfileUser();
  }, []);

  if (isLoading || sessionIsPending) {
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
          <p>{profileUser.followingCount}</p>
        </div>

        <div>
          <h3>Followers</h3>
          <p>{profileUser.followerCount}</p>
        </div>
      </div>

      {!isOwnProfile && (
        <div className="follow-cta-container">
          {!profileUser.isFollowedByCurrentUser ? (
            <CTA
              text="Follow"
              onClick={() => handleFollowAction(handleFollowUser)}
              isLoading={isPending}
            />
          ) : (
            <CTA
              text="Unfollow"
              appearance="secondary"
              onClick={() => handleFollowAction(handleUnfollowUser)}
              isLoading={isPending}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
