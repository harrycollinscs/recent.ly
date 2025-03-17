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
  const mediaCategories = ["Movies", "TV Shows", "Albums", "Books", "Games"];

  useEffect(() => {
    if (searchValue.length) {
      fetchAndUpdate(searchValue);
    }
  }, [filter]);

  async function fetchAndUpdate(value: string) {
    const type = filter.replace(/\s/g, "").toLowerCase();
    const res = await (await fetch(`/api/${type}/search/${value}`)).json();
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
          <div className="add-post-modal">
            <h1>Add to your recents</h1>
            <div className="pills-container">
              {mediaCategories.map((item) => (
                <button
                  className={`pill${item === filter ? "_active" : ""}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <input
              placeholder="Search"
              type="text"
              className="app-search-bar"
              onChange={handleSearch}
              autoFocus
            />

            {!!searchResults?.length && (
              <ul>
                {searchResults.map((result) => {
                  const date = new Date(result.released);

                  return (
                    <li>
                      <div className="search-item-content">
                        <img src={result.image} />

                        <div>
                          <p>{result.title}</p>
                          <p className="result-date">{date.getFullYear()}</p>
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
