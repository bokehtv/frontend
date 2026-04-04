import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Catalog",
  description: "Browse and discover thousands of movies and TV shows from the TMDB database.",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
