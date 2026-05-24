import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 60;

export async function GET() {
  const posts = getAllPosts();
  const urls = posts
    .map(
      (p) => `
      <url>
        <loc>https://blog.saadengineer.works/${p.slug}</loc>
        <lastmod>${p.date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://blog.saadengineer.works/</loc>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    ${urls}
  </urlset>`;

  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}
