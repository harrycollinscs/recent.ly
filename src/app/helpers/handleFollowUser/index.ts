const handleFollowUser = async (userId: string) => {
  const response = await fetch("/api/users/follow", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  return response
};

export default handleFollowUser;
