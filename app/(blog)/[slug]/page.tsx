import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { MDXComponents } from "@/components/MDXComponents";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const all = getAllSlugs();
  if (!all.includes(slug)) return notFound();

  const { frontMatter, content } = getPostBySlug(slug);
  const stats = readingTime(content);

  return (
    <main className="min-h-screen bg-[#030303] text-neutral-100">
      <div className="max-w-3xl mx-auto px-5 py-14">
        <div className="mb-8">
          <a href="/" className="text-sm text-blue-400">← All Articles</a>
          <div className="text-neutral-400 text-sm mt-2">{new Date(frontMatter.date).toLocaleDateString()} · {stats.text}</div>
          <h1 className="text-4xl font-extrabold mt-2">{frontMatter.title}</h1>
        </div>
        <article className="prose prose-invert max-w-none">
          <MDXRemote
            source={content}
            components={MDXComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
              },
            }}
          />
        </article>
      </div>
    </main>
  );
}
