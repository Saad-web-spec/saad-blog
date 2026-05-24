"use client";

export default function Share({ title, url }: { title: string; url: string }) {
  const enc = encodeURIComponent;
  const links = {
    x: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${enc(title + " " + url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
  } as const;
  return (
    <div className="flex items-center gap-3">
      <a className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer" href={links.x}>Share on X</a>
      <span className="text-neutral-600">•</span>
      <a className="text-green-400 hover:text-green-300" target="_blank" rel="noopener noreferrer" href={links.whatsapp}>WhatsApp</a>
      <span className="text-neutral-600">•</span>
      <a className="text-sky-400 hover:text-sky-300" target="_blank" rel="noopener noreferrer" href={links.linkedin}>LinkedIn</a>
      <span className="text-neutral-600">•</span>
      <a className="text-blue-500 hover:text-blue-400" target="_blank" rel="noopener noreferrer" href={links.facebook}>Facebook</a>
    </div>
  );
}
