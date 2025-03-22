"use client";
import Modal from "@app/components/atoms/Modal";
import handleCreatePost from "@app/helpers/api/handleCreatePost";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import "./AddPostModal.scss";

interface AddPostModalProps {
  isOpen: boolean;
  handleModalClose: () => void;
}

const AddPostModal = ({ isOpen, handleModalClose }: AddPostModalProps) => {
  const [filter, setFilter] = useState("Movies");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedFetch = debounce(fetchAndUpdate, 1000, { maxWait: 1 });
  const mediaCategories = ["Movies", "TV Shows", "Albums", "Books", "Games"];

  useEffect(() => {
    if (searchValue.length) {
      fetchAndUpdate(searchValue);
    }
  }, [filter]);

  async function fetchAndUpdate(value: string) {
    setIsLoading(true);
    const type = filter.replace(/\s/g, "").toLowerCase();
    const res = await (await fetch(`/api/${type}/search/${value}`)).json();
    setSearchResults(res);
    setIsLoading(false);
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

  const handlePostClick = async (media: any) => {
    const { _id, type } = media;
    await handleCreatePost(_id, type);
  };

  return (
    <Modal
      title="Add to your recents"
      isOpen={isOpen}
      handleClose={handleModalClose}
    >
      <div className="add-post-modal">
        <div className="pills-container">
          {mediaCategories.map((item) => (
            <button
              className={`pill${item === filter ? "_active" : ""}`}
              onClick={() => setFilter(item)}
              key={item}
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
                <li key={result.title}>
                  <div className="search-item-content">
                    <img src={result.image} />

                    <div>
                      <p>{result.title}</p>
                      <p className="result-date">{date.getFullYear()}</p>
                    </div>
                  </div>

                  {result.hasUserPosted ? (
                    <div className="tick">✔</div>
                  ) : (
                    <button onClick={() => handlePostClick(result)}>+</button>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {isLoading && (
          <div style={{ margin: "1rem" }}>
            <MoonLoader size={20} color="grey" loading={isLoading} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddPostModal;
