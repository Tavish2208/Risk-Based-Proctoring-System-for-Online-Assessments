"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CandidateExam() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!data || !data.session || !data.session.user) {
        router.push("/auth/login"); // Redirect to login if no session
        return;
      }

      const userId = data.session.user.id;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        router.push("/auth/login");
      } else {
        setUser({ id: userId, email: data.session.user.email, role: profile.role });
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Candidate Exam Interface</h1>
      <p>Welcome, {user?.email}</p>
      <p>Role: {user?.role}</p>
      {/* Add candidate exam functionality here */}
    </div>
  );
}