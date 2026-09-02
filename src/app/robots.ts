import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended", "Applebot"],
        allow: "/",
        disallow: ["/admin/", "/api/"],
      }
    ],
    sitemap: "https://aymuhendislik.com.tr/sitemap.xml",
  };
}
