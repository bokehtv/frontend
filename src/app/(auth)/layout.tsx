import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authenticate",
  description: "Sign in or create an account to start tracking your movie and TV frames on BokehTV.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
