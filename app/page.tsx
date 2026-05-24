import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";

export const revalidate = 60;

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main className="min-h-screen bg-[#030303] text-neutral-100">
      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Engineer Saad’s Articles</h1>
          <p className="text-neutral-400 mt-3 text-lg">ChemE · AI · Space · Community</p>
        </div>

        {featured && (
          <Link href={`/${featured.slug}`} className="block mb-12 group">
            <article className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900/30 hover:bg-neutral-900/60 transition">
              {featured.cover && (
                <div className="aspect-[2.4/1] overflow-hidden">
                  <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
              )}
              <div className="p-7">
                {featured.tags && (
                  <div className="flex gap-2 mb-3">
                    {featured.tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{t}</span>
                    ))}
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight group-hover:text-blue-300 transition">{featured.title}</h2>
                {featured.excerpt && <p className="text-neutral-300 mt-3 text-lg">{featured.excerpt}</p>}
                <Byline authorId={featured.author} date={featured.date} />
              </div>
            </article>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6">
            {rest.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="group">
                <article className="h-full rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900/30 hover:bg-neutral-900/60 transition flex flex-col">
                  {p.cover && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {p.tags && (
                      <div className="flex gap-2 mb-2">
                        {p.tags.slice(0, 2).map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{t}</span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-bold group-hover:text-blue-300 transition">{p.title}</h3>
                    {p.excerpt && <p className="text-neutral-400 text-sm mt-2 line-clamp-2">{p.excerpt}</p>}
                    <div className="mt-auto pt-3">
                      <Byline authorId={p.author} date={p.date} small />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function Byline({ authorId, date, small = false }: { authorId: string; date: string; small?: boolean }) {
  const author = getAuthor(authorId);
  return (
    <div className={`flex items-center gap-2 mt-4 ${small ? "text-xs" : "text-sm"} text-neutral-400`}>
      {author?.avatar && <img src={author.avatar} alt={author.name} className={`${small ? "w-5 h-5" : "w-7 h-7"} rounded-full border border-neutral-700`} />}
      <span className="text-neutral-300 font-medium">{author?.name || "M.Saad"}</span>
      <span>·</span>
      <span>{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
    </div>
  );
}
