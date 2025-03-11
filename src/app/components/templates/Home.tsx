const Home = async () => {
  const albums = await (
    await fetch(`${process.env.BASE_URL}/api/albums`)
  ).json();

  return (
    <>
      <div className="home-body">
        <div className="artist-search-container">
          <div className="artist-results-list">
            <ul>
              {albums?.map((album, index) => (
                <li key={index}>
                  <div>
                    <img src={album.image} />
                    <p>{album.title}</p>
                  </div>
                  <div />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="playlist-selection-container">
          <p className="subtitle">Playlists</p>
        </div>
      </div>
    </>
  );
};

export default Home;
