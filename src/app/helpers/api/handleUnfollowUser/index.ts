const handleUnfollowUser = async (userId: string) => {
  return await fetch("/api/users/unfollow", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
};

export default handleUnfollowUser;
