export default function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt} className="w-full rounded-xl border border-neutral-800" loading="lazy" />
      {caption && <figcaption className="text-center text-sm text-neutral-400 mt-2">{caption}</figcaption>}
    </figure>
  );
}
