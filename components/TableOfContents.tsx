"use client";
import { useEffect, useState } from "react";

type Item = { id: string; text: string; level: number };

export default function TableOfContents() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const hs = Array.from(document.querySelectorAll("article h2, article h3")) as HTMLElement[];
    const mapped = hs.map((el) => ({ id: el.id, text: el.innerText, level: el.tagName === "H2" ? 2 : 3 }));
    setItems(mapped);
  }, []);
  if (!items.length) return null;
  return (
    <aside className="hidden lg:block sticky top-20 self-start w-64 text-sm text-neutral-400">
      <div className="mb-2 font-semibold text-neutral-200">On this page</div>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.id} className={i.level === 3 ? "ml-3" : ""}>
            <a className="hover:text-blue-400" href={`#${i.id}`}>{i.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
