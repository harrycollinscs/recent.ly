const Home = async () => {
  const albums = await (
    await fetch(`${process.env.BASE_URL}/api/albums`)
  ).json(); // Replace with your API endpoint

  return (
    <>
      <section className="home-header">
        <div>
          <p className="title">Welcome!</p>
          <div className="summary-container">
            <p>
              This app was designed to allow you to remove an artist from your
              Spotify playlists in just a few clicks.
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          width="9rem"
          height="9rem"
        >
          <path
            fill="#FF6AB4"
            d="M22.2,-27.6C33.7,-31.8,51.3,-35.8,49.4,-31.2C47.5,-26.5,26,-13.3,21,-2.9C16,7.5,27.4,15,33.3,26.5C39.2,38,39.6,53.6,33.1,59.2C26.6,64.8,13.3,60.4,5.5,51C-2.4,41.5,-4.8,27,-7.9,19.5C-11.1,11.9,-14.9,11.4,-28.1,9.3C-41.2,7.2,-63.6,3.6,-72.2,-5C-80.8,-13.6,-75.7,-27.1,-63.2,-30.3C-50.7,-33.5,-30.8,-26.2,-19.1,-22C-7.3,-17.7,-3.7,-16.3,0.8,-17.7C5.3,-19.2,10.7,-23.5,22.2,-27.6Z"
            transform="translate(100, 40)"
          />
        </svg>
      </section>

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
