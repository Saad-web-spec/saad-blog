import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostFrontMatter = {
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  author: string;
  tags?: string[];
  cover?: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontMatter;
  return { frontMatter: fm, content };
}

export function getAllPosts() {
  return getAllSlugs()
    .map((slug) => {
      const { frontMatter } = getPostBySlug(slug);
      return frontMatter;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
