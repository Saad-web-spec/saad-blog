import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 60;

export default function BlogHome() {
  const posts = getAllPosts();
  return (
    <main className="min-h-screen bg-[#030303] text-neutral-100">
      <div className="max-w-3xl mx-auto px-5 py-14">
        <div className="mb-10">
          <Link href="https://saadengineer.works" className="text-sm text-blue-400">← Portfolio</Link>
          <h1 className="text-4xl font-extrabold mt-4">Engineer Saad’s Articles</h1>
          <p className="text-neutral-300 mt-2">ChemE · AI · Space · Community</p>
        </div>
        <div className="space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="border border-neutral-800 rounded-xl p-5 bg-neutral-900/30 hover:bg-neutral-900/50 transition">
              <h2 className="text-2xl font-bold"><Link href={`/${p.slug}`}>{p.title}</Link></h2>
              {p.excerpt && <p className="text-neutral-300 mt-1">{p.excerpt}</p>}
              <div className="text-neutral-400 text-sm mt-2">{new Date(p.date).toLocaleDateString()} · {p.tags?.join(" · ")}</div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
