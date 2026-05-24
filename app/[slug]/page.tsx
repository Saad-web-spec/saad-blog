import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getAllPosts, getPostBySlug } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { MDXComponents } from "@/components/MDXComponents";
import ProgressBar from "@/components/ProgressBar";
import TableOfContents from "@/components/TableOfContents";
import Share from "@/components/Share";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) return {};
  const { frontMatter } = getPostBySlug(slug);
  const url = `https://blog.saadengineer.works/${frontMatter.slug}`;
  const ogImage = `https://blog.saadengineer.works/og?title=${encodeURIComponent(frontMatter.title)}`;
  return {
    title: frontMatter.title,
    description: frontMatter.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: frontMatter.title,
      description: frontMatter.excerpt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontMatter.title,
      description: frontMatter.excerpt,
      images: [ogImage],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) return notFound();

  const { frontMatter, content } = getPostBySlug(slug);
  const stats = readingTime(content);
  const author = getAuthor(frontMatter.author);
  const url = `https://blog.saadengineer.works/${frontMatter.slug}`;

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontMatter.title,
    description: frontMatter.excerpt,
    image: frontMatter.cover ? [`https://blog.saadengineer.works${frontMatter.cover}`] : undefined,
    datePublished: frontMatter.date,
    dateModified: frontMatter.date,
    author: { "@type": "Person", name: author?.name || "M.Saad", url: author?.social?.website },
    mainEntityOfPage: url,
  };

  return (
    <main className="min-h-screen bg-[#030303] text-neutral-100">
      <ProgressBar />

      {/* Cover Image (X-style panoramic banner) */}
      {frontMatter.cover && (
        <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
          <img src={frontMatter.cover} alt={frontMatter.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/40 to-[#030303]" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,760px)_1fr] gap-12">
        <div>
          {/* Tag chips */}
          {frontMatter.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {frontMatter.tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            {frontMatter.title}
          </h1>

          {/* Byline (X-style) */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-neutral-800">
            {author?.avatar && (
              <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full border border-neutral-700" />
            )}
            <div className="flex-1">
              <div className="font-semibold">{author?.name || "M.Saad"}</div>
              <div className="text-sm text-neutral-400">
                {new Date(frontMatter.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {stats.text}
              </div>
            </div>
            <Share title={frontMatter.title} url={url} compact />
          </div>

          {/* Article body */}
          <article className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-24 prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-neutral-800 prose-img:rounded-xl">
            <MDXRemote
              source={content}
              components={MDXComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    [rehypePrettyCode, { theme: "one-dark-pro", keepBackground: true }],
                  ],
                },
              }}
            />
          </article>

          {/* Footer share */}
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <div className="text-sm text-neutral-400 mb-3">Enjoyed this article? Share it:</div>
            <Share title={frontMatter.title} url={url} />
          </div>

          {/* Author card */}
          {author && (
            <div className="mt-10 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 flex items-start gap-4">
              {author.avatar && <img src={author.avatar} alt={author.name} className="w-16 h-16 rounded-full border border-neutral-700" />}
              <div>
                <div className="font-bold text-lg">{author.name}</div>
                <div className="text-neutral-400 text-sm mt-1">{author.bio}</div>
                {author.social?.website && (
                  <a href={author.social.website} className="inline-block mt-2 text-blue-400 text-sm hover:text-blue-300">View Portfolio →</a>
                )}
              </div>
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-14">
              <h3 className="text-2xl font-bold mb-5">More articles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/${r.slug}`} className="block p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900/50 transition">
                    <div className="font-semibold">{r.title}</div>
                    {r.excerpt && <div className="text-sm text-neutral-400 mt-1 line-clamp-2">{r.excerpt}</div>}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <TableOfContents />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}
