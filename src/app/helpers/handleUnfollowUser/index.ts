const handleUnfollowUser = async (userId: string) => {
  const response = await fetch("/api/users/unfollow", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  return response
};

export default handleUnfollowUser;
