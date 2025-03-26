"use client";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import "./Home.styles.scss";
import PostFeedItem from "@app/components/molecules/PostFeedItem";

const Home = () => {
  const [isLoadingPosts, setisLoadingPosts] = useState(false);
  const [posts, setPosts] = useState([]);

  // TODO eventually investigate server component fetch issue with session
  const fetchPosts = async () => {
    setisLoadingPosts(true);
    const posts = await ((await fetch("/api/posts/feed")) || {}).json();
    setPosts(posts);
    setisLoadingPosts(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="home-body">
        <section className="new-from-friends-section">
          <h1>New from friends</h1>
          {isLoadingPosts && (
            <div style={{ margin: "1rem" }}>
              <MoonLoader size={20} color="grey" loading={isLoadingPosts} />
            </div>
          )}

          {!!posts?.length && (
            <ul style={{ display: 'flex', flexDirection: 'column', gap:'2rem'}}>
              {posts.map((post) => (
                <PostFeedItem post={post} key={post._id} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
