"use client";
import CTA from "@app/components/atoms/CTA";
import handleFollowUser from "@app/helpers/api/handleFollowUser";
import handleUnfollowUser from "@app/helpers/api/handleUnfollowUser";
import { useRouterRefresh } from "@app/helpers/useRouterRefresh";
import { useState } from "react";

interface ProfileHeaderProps {
  user: any;
  isOwnProfile: boolean;
}

const ProfileHeader = ({ user, isOwnProfile }: ProfileHeaderProps) => {
  const [isPending, setIsPending] = useState(false);
  const refresh = useRouterRefresh();

  const handleFollowAction = async (method: any) => {
    setIsPending(true);
    await method(user._id);

    refresh().then(() => {
      setIsPending(false);
    });
  };

  return (
    <div className="header">
      <div className="user">
        <img src={user.image} />
        <h1>{user.username}</h1>
      </div>

      <div
        className="follow-container"
        style={{ display: "flex", flexDirection: "row", gap: "5rem" }}
      >
        <div>
          <h3>Following</h3>
          <p>{user.followingCount}</p>
        </div>

        <div>
          <h3>Followers</h3>
          <p>{user.followerCount}</p>
        </div>
      </div>

      {!isOwnProfile && (
        <div className="follow-cta-container">
          {!user.isFollowedByCurrentUser ? (
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

export default ProfileHeader;
