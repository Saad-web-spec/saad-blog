"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WriterStudio() {
  const [title, setTitle] = useState("");
  const [publishing, setPublishing] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Start writing your amazing article here...</p>",
    editorProps: {
      attributes: {
        className: "prose prose-invert prose-lg max-w-none focus:outline-none min-h-[50vh]",
      },
    },
  });

  const handlePublish = async () => {
    if (!editor || !title) return alert("Title and content are required.");
    setPublishing(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("You must be logged in to publish.");

      // For slug, we just lowercase the title and replace spaces with hyphens
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

      const html = editor.getHTML();
      // Extract a short excerpt from the text
      const text = editor.getText();
      const excerpt = text.length > 150 ? text.slice(0, 150) + "..." : text;

      const { error } = await supabase.from("posts").insert({
        title,
        slug,
        content: html,
        excerpt,
        author_id: session.user.id,
      });

      if (error) throw error;

      alert("Published successfully!");
      window.location.href = `/post/${slug}`;
    } catch (err: any) {
      alert(err.message);
    } finally {
      setPublishing(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="flex items-center justify-between mb-8 pb-8 border-b border-neutral-800">
        <h1 className="text-3xl font-bold">Writer Studio</h1>
        <button
          onClick={handlePublish}
          disabled={publishing}
          className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-neutral-200 transition disabled:opacity-50"
        >
          {publishing ? "Publishing..." : "Publish Article"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-transparent text-5xl font-extrabold outline-none placeholder:text-neutral-700 mb-8"
      />

      <div className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900/30">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
