"use client";
import handleSignOut from "@app/helpers/api/handleSignOut";
import Link from "next/link";
import "./NavigationBar.styles.scss";
import { useRef, useState } from "react";
import { debounce } from "lodash";

const NavLinks = [
  {
    title: "Home",
    href: "/",
  },
];

const UserListItem = ({ user, onClick }) => {
  const { username, image } = user;

  return (
    <li key={username}>
      <Link
        href={`/users/${username}`}
        key={username}
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        <img src={image} style={{ height: "2rem", width: "2rem" }} />
        {username}
      </Link>
    </li>
  );
};

const NavigationBar = ({ user }: any) => {
  const [searchResults, setSearchResults] = useState<any[]>();
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const containerRef = useRef(null);
  const debouncedFetch = debounce(fetchAndUpdate, 1000, { maxWait: 1 });

  async function fetchAndUpdate(value: string) {
    const res = await (await fetch(`/api/users/search/${value}`)).json();
    setSearchResults(res);
  }

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    if (value?.length) {
      debouncedFetch(value);
    } else {
      setSearchResults([]);
    }
  };

  const onBlurHandler = (e) => {
    e.stopPropagation();

    if (!containerRef?.current?.contains(e.relatedTarget)) {
      setInputIsFocused(false);
    }
  };

  return (
    <nav>
      <p>Recent.ly</p>

      <ul>
        {NavLinks.map(({ title, href }) => (
          <Link href={href} key={title}>
            <li key={title}>{title}</li>
          </Link>
        ))}
        <li key="Profile">
          <Link href={`/users/${user.username}`} key={user.username}>
            Profile
          </Link>
        </li>
      </ul>

      <div
        className="app-search"
        onFocus={() => setInputIsFocused(true)}
        onBlur={onBlurHandler}
        ref={containerRef}
      >
        <input
          placeholder="Search"
          type="text"
          className="app-search-bar"
          onChange={handleSearch}
        />

        {!!searchResults?.length && inputIsFocused && (
          <div className="app-search-results">
            <ul className="app-search-results-list">
              {searchResults.map((user) => (
                <UserListItem
                  user={user}
                  onClick={() => setInputIsFocused(false)}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      <Link
        href="#"
        onClick={handleSignOut}
        className="sign-out-link"
        prefetch={true}
      >
        Sign out
      </Link>
    </nav>
  );
};

export default NavigationBar;
