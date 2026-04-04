import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://bokehtv.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/profile/", "/watchlist/"], // Keeping tracking data private
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
