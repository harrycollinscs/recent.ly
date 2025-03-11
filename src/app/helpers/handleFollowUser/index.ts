const handleFollowUser = async (userId: string) => {
  const response = await fetch("/api/users/follow", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  console.log({ response });
};

export default handleFollowUser;
