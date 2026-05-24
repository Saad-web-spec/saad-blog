"use client";

export default function Share({ title, url, compact = false }: { title: string; url: string; compact?: boolean }) {
  const enc = encodeURIComponent;
  const links = {
    x: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${enc(title + " " + url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
  } as const;

  const btn = "p-2 rounded-full border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 transition flex items-center justify-center";

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <a aria-label="Share on X" className={btn} target="_blank" rel="noopener noreferrer" href={links.x}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a aria-label="Share on WhatsApp" className={btn} target="_blank" rel="noopener noreferrer" href={links.whatsapp}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.523 5.273l-.999 3.648 3.965-1.04z"/></svg>
        </a>
        <a aria-label="Copy link" className={btn} href={url} onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(url); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a className="px-4 py-2 rounded-full bg-black border border-neutral-700 hover:border-white text-sm flex items-center gap-2" target="_blank" rel="noopener noreferrer" href={links.x}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Share on X
      </a>
      <a className="px-4 py-2 rounded-full bg-green-600/10 border border-green-600/30 hover:border-green-500 text-green-400 text-sm" target="_blank" rel="noopener noreferrer" href={links.whatsapp}>WhatsApp</a>
      <a className="px-4 py-2 rounded-full bg-sky-600/10 border border-sky-600/30 hover:border-sky-500 text-sky-400 text-sm" target="_blank" rel="noopener noreferrer" href={links.linkedin}>LinkedIn</a>
      <a className="px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/30 hover:border-blue-500 text-blue-400 text-sm" target="_blank" rel="noopener noreferrer" href={links.facebook}>Facebook</a>
      <button className="px-4 py-2 rounded-full border border-neutral-700 hover:border-white text-sm" onClick={() => navigator.clipboard.writeText(url)}>Copy link</button>
    </div>
  );
}
