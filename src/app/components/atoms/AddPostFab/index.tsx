"use client";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Fab } from "react-tiny-fab";
import "./AddPostFab.styles.scss";

const AddPostFab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("Movies");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedFetch = debounce(fetchAndUpdate, 1000, { maxWait: 1 });

  useEffect(() => {
    if (searchValue.length) {
      fetchAndUpdate(searchValue);
    }
  }, [filter]);

  async function fetchAndUpdate(value: string) {
    const type = filter.replace(/\s/g, "").toLowerCase();
    console.log({ apiString: `/api/${type}/search/${value}` });
    const res = await (await fetch(`/api/${type}/search/${value}`)).json();
    console.log({ res });
    setSearchResults(res);
  }

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    setSearchValue(value);

    if (value?.length) {
      debouncedFetch(value);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <Fab
        mainButtonStyles={{ backgroundColor: "#f5b5ff" }}
        icon={"+"}
        alwaysShowTitle={true}
        onClick={() => setIsModalOpen(true)}
      >
        {/* <Action text="Email" onClick={() => {}} />
        <Action text="Help" onClick={() => {}}>
          <i className="fa fa-help" />
        </Action> */}
      </Fab>

      {isModalOpen &&
        createPortal(
          // <ModalContent onClose={() => setShowModal(false)} />,
          <div className="add-post-modal">
            <h1>Add to your recents</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "2rem",
              }}
            >
              {["Movies", "TV Shows", "Albums", "Books", "Games"].map(
                (item) => (
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      marginRight: "0.25rem",
                      backgroundColor: item === filter ? "#f5b5ff" : "#eee",
                      borderRadius: "0.5rem",
                      border: "none",
                    }}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
            <input
              placeholder="Search"
              type="text"
              className="app-search-bar"
              onChange={handleSearch}
              autoFocus
            />

            {!!searchResults?.length && (
              <ul style={{ marginTop: "2rem" }}>
                {searchResults.map((result) => {
                  const date = new Date(result.released);
                  console.log({
                    released: date.getFullYear(),
                  });
                  return (
                    <li
                      style={{
                        listStyleType: "none",
                        padding: "1rem 0rem",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <img
                          src={result.image}
                          style={{
                            height: "3rem",
                            width: "3rem",
                            marginRight: "1rem",
                            borderRadius: "5rem",
                          }}
                        />

                        <div>
                          <p>{result.title}</p>
                          <p style={{ color: "#d0d0d0" }}>
                            {date.getFullYear()}
                          </p>
                        </div>
                      </div>

                      <button>+</button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default AddPostFab;
