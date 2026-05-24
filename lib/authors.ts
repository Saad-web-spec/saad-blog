import fs from "fs";
import path from "path";

export type Author = {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  social?: { x?: string; github?: string; website?: string };
};

const DIR = path.join(process.cwd(), "content", "authors");

export function getAuthor(id: string): Author | null {
  try {
    const file = path.join(DIR, `${id}.json`);
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw) as Author;
  } catch {
    return null;
  }
}
