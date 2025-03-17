const handleCreatePost = async (mediaId: any, type: string) => {
  return await fetch("/api/posts/create", {
    method: "POST",
    body: JSON.stringify({ mediaId, type }),
  });
};

export default handleCreatePost;
