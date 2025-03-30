"use client";
import CTA from "@app/components/atoms/CTA";
import handleFollowUser from "@app/helpers/api/handleFollowUser";
import handleUnfollowUser from "@app/helpers/api/handleUnfollowUser";
import { useRouterRefresh } from "@app/helpers/useRouterRefresh";
import Image from "next/image";
import { useState } from "react";
import "./ProfileHeader.styles.scss";

interface ProfileHeaderProps {
  user: any;
  isOwnProfile: boolean;
  recentsItems: any[];
}

const ProfileHeader = ({
  user,
  isOwnProfile,
  recentsItems,
}: ProfileHeaderProps) => {
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

      <div className="follow-container">
        <div>
          <h3>Following</h3>
          <p>{user.followingCount}</p>
        </div>

        <div>
          <h3>Followers</h3>
          <p>{user.followerCount}</p>
        </div>
      </div>

      <div className="follow-cta-container">
        {!isOwnProfile && (
          <>
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
          </>
        )}

        {!!recentsItems?.length && (
          <div style={{ display: "flex" }} className="recents-container">
            {recentsItems.map(({ media }) => (
              <Image
                alt={`${media.type}: ${media.title}`}
                src={media.image}
                width={40}
                height={60}
                priority
                // unoptimized={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
