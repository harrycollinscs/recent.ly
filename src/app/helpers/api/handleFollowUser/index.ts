const handleFollowUser = async (userId: string) => {
  return await fetch("/api/users/follow", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
};

export default handleFollowUser;
