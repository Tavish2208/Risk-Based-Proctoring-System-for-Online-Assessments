"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session?.user) {
        const userId = data.session.user.id;
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .single();

        if (profile && !profileError) {
          router.replace(profile.role === "admin" ? "/admin" : "/candidate");
          return;
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading)
    return <p className="text-center mt-10 text-lg font-semibold text-gray-600">Redirecting...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white px-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Risk-Based Proctoring</h1>
        <p className="text-lg text-gray-200 mb-8">Ensure academic integrity with our smart proctoring system.</p>
      </motion.div>

      {/* Login Options */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Admin Login */}
        <div 
          className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-xl shadow-lg w-80 hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => router.push("/auth/login?role=admin")} // ✅ Fixed navigation
        >
          <h2 className="text-2xl font-semibold mb-3">Admin Login</h2>
          <p className="text-sm text-gray-600 mb-4">For exam supervisors & administrators.</p>
          <button
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Admin Login
          </button>
        </div>

        {/* Candidate Login */}
        <div 
          className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-xl shadow-lg w-80 hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => router.push("/auth/login?role=candidate")} // ✅ Fixed navigation
        >
          <h2 className="text-2xl font-semibold mb-3">Candidate Login</h2>
          <p className="text-sm text-gray-600 mb-4">For students taking online assessments.</p>
          <button
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            Candidate Login
          </button>
        </div>
      </motion.div>

      {/* Sign Up Option */}
      <motion.p
        className="mt-8 text-gray-100 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        New user?  
        <button
          onClick={() => router.push("/auth/signup")}
          className="text-yellow-400 font-semibold hover:underline ml-2"
        >
          Sign Up
        </button>
      </motion.p>
    </div>
  );
}