"use client";
import handleSignOut from "@app/helpers/api/handleSignOut";
import Link from "next/link";
import "./NavigationBar.styles.scss";

const NavLinks = [
  {
    title: "Home",
    href: "/",
  },
];

const NavigationBar = ({ user }: any) => (
  <nav>
    <p>Recent.ly</p>

    <ul>
      {NavLinks.map(({ title, href }) => (
        <Link href={href} key={title}>
          <li key={title}>{title}</li>
        </Link>
      ))}
      <Link href={`/users/${user.username}`} key={user.username}>
        <li key="Profile">Profile</li>
      </Link>
    </ul>

    <Link href="#" onClick={handleSignOut} className="sign-out-link" prefetch={true}>
      Sign out
    </Link>
  </nav>
);

export default NavigationBar;
