"use client";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoadingPosts, setisLoadingPosts] = useState(false);
  const [posts, setPosts] = useState([]);

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
        <h1>New from friends</h1>

        {!!posts?.length && (
          <ul>
            {posts.map(({_id, media, user}) => {
              console.log({user})
              return(
              <li key={_id}>
                <div>
                  <p>{user.username}</p>
                  <p>{media.title}</p>
                </div>
              </li>
            )})}
          </ul>
        )}
      </div>
    </>
  );
};

export default Home;
