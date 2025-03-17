const Home = async () => {
  const albums = await (
    await fetch(`${process.env.BASE_URL}/api/albums`)
  ).json();

  return (
    <>
      <div className="home-body">
        <h1>New from friends</h1>
      </div>
    </>
  );
};

export default Home;
