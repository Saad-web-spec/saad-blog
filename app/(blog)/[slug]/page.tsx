import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { MDXComponents } from "@/components/MDXComponents";
import ProgressBar from "@/components/ProgressBar";
import TableOfContents from "@/components/TableOfContents";
import Share from "@/components/Share";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const all = getAllSlugs();
  if (!all.includes(slug)) return notFound();

  const { frontMatter, content } = getPostBySlug(slug);
  const stats = readingTime(content);

  const url = `https://blog.saadengineer.works/${frontMatter.slug}`;

  return (
    <main className="min-h-screen bg-[#030303] text-neutral-100">
      <ProgressBar />
      <div className="max-w-5xl mx-auto px-5 py-14 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,720px)_1fr] gap-10">
        <div className="hidden lg:block" />
        <div>
        <div className="mb-8">
          <a href="/" className="text-sm text-blue-400">← All Articles</a>
          <div className="text-neutral-400 text-sm mt-2">{new Date(frontMatter.date).toLocaleDateString()} · {stats.text}</div>
          <h1 className="text-4xl font-extrabold mt-2">{frontMatter.title}</h1>
          <div className="mt-3"><Share title={frontMatter.title} url={url} /></div>
        </div>
        <article className="prose prose-invert max-w-none">
          <MDXRemote
            source={content}
            components={MDXComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  [
                    // @ts-ignore
                    rehypePrettyCode,
                    {
                      theme: "one-dark-pro",
                      keepBackground: true,
                    },
                  ],
                ],
              },
            }}
          />
        </article>
        {/* Giscus placeholder (requires repo setup) */}
        <div className="mt-10 text-neutral-400 text-sm">Comments coming soon.</div>
        </div>
        <TableOfContents />
      </div>
    </main>
  );
}
