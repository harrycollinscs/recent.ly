import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import NavigationBar from "./components/organisms/NavigationBar";
import "./globals.css";
import { auth } from "./lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "recent.ly",
  description: "Share and compare your recently enjoyed media.",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const headersList = await headers();
  const currentPath = headersList.get("x-current-path");

  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session && currentPath !== "/login") {
    redirect("/login");
  }

  if (session && currentPath === "/login") {
    redirect("/");
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {!!session && <NavigationBar />}
          <main className="main-container">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
