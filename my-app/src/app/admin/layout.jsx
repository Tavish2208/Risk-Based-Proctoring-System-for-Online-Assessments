import Navbar from "@/components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}