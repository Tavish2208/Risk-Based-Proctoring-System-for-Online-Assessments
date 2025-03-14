"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data?.session?.user) {
        router.replace("/auth/login"); // Redirect to login if no session
        return;
      }

      const userId = data.session.user.id;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError || !profile || profile.role !== "admin") {
        router.replace("/auth/login");
      } else {
        setUser({ id: userId, email: data.session.user.email, role: profile.role });
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading)
    return <p className="text-center mt-10 text-lg font-semibold text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600">Admin Dashboard</h1>
        <p className="text-center text-gray-600 mt-2">
          Welcome, <span className="font-semibold">{user?.email}</span>
        </p>
        <p className="text-center text-gray-500 mt-1">
          Role: <span className="font-medium">{user?.role}</span>
        </p>

        {/* Admin Dashboard Options */}
        <div className="mt-6 space-y-4">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all">
            Manage Users
          </button>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all">
            View Reports
          </button>
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-all">
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
}