"use client";
import handleSignOut from "@app/helpers/handleSignOut";
import Link from "next/link";
import "./NavigationBar.styles.scss";

const NavLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "History",
    href: "/history",
  },
];

const NavigationBar = () => (
  <nav>
    <p>Recent.ly</p>

    <ul>
      {NavLinks.map(({ title, href }) => (
        <Link href={href} key={title}>
          <li key={title}>{title}</li>
        </Link>
      ))}
    </ul>

    <Link href="#" onClick={handleSignOut} className="sign-out-link">
      Sign out
    </Link>
  </nav>
);

export default NavigationBar;
