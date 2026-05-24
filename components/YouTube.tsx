export default function YouTube({ id, title }: { id: string; title?: string }) {
  return (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-xl border border-neutral-800">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title || "YouTube video"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
