"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // ✅ Ensure Supabase logs out the user
    sessionStorage.clear(); // ✅ Clear session storage
    localStorage.clear(); // ✅ Clear local storage

    router.replace("/"); // ✅ Instant redirect to landing page
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-lg font-bold">Risk-Based Proctoring</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
      >
        Logout
      </button>
    </nav>
  );
}