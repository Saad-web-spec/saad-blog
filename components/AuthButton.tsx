"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <a href="/write" className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-full transition">Write</a>
        <button onClick={handleLogout} className="text-sm text-neutral-400 hover:text-white">Logout</button>
      </div>
    );
  }

  return (
    <button onClick={handleLogin} className="text-sm bg-white hover:bg-neutral-200 text-black px-4 py-1.5 rounded-full font-medium transition">
      Sign In
    </button>
  );
}
