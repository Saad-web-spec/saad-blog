import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 60;

export async function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (p) => `
      <item>
        <title>${escapeXml(p.title)}</title>
        <link>https://blog.saadengineer.works/${p.slug}</link>
        <guid>https://blog.saadengineer.works/${p.slug}</guid>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        <description>${escapeXml(p.excerpt || "")}</description>
      </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>M.Saad Blog</title>
      <link>https://blog.saadengineer.works/</link>
      <description>Engineer Saad’s articles on Chemical Engineering, AI, Space, and Community.</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}

function escapeXml(s: string) {
  return s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]!));
}
