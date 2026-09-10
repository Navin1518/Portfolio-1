import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { apiRequest } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "admin") {
      Promise.all([apiRequest("/admin/stats"), apiRequest("/admin/users")])
        .then(([statsResult, usersResult]) => { setStats(statsResult.stats); setUsers(usersResult.users); })
        .catch((requestError) => setError(requestError.message));
    }
  }, [user]);

  if (loading) return <Container className="py-16 text-center text-slate-500">Loading…</Container>;
  if (!user || user.role !== "admin") return <Navigate to="/requests" replace />;

  async function toggleUser(item) {
    try {
      const result = await apiRequest(`/admin/users/${item._id}/status`, { method: "PATCH", body: { isActive: !item.isActive } });
      setUsers(users.map((candidate) => candidate._id === item._id ? { ...candidate, isActive: result.user.isActive } : candidate));
    } catch (requestError) {
      setError(requestError.message);
    }

    async function changeRole(item, role) {
      try {
        const result = await apiRequest(`/admin/users/${item._id}/role`, { method: "PATCH", body: { role } });
        setUsers(users.map((candidate) => candidate._id === item._id ? { ...candidate, role: result.user.role } : candidate));
      } catch (requestError) {
        setError(requestError.message);
      }
    }
  }

  return <>
    <PageHeader eyebrow="Admin" title="CampusConnect administration" description="Review platform health and manage account access." />
    <Container className="space-y-8 py-10">
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats && Object.entries(stats).map(([label, value]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs uppercase text-slate-500">{label.replace(/([A-Z])/g, " $1")}</p><p className="mt-2 text-2xl font-bold text-brand-800">{value}</p></div>)}</div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 px-5 py-4 font-semibold text-slate-800">User access</div><div className="divide-y divide-slate-100">{users.map((item) => <div key={item._id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><p className="text-sm font-medium text-slate-800">{item.name} · {item.role}</p><p className="text-xs text-slate-500">{item.email} · {item.department || "No department"}</p></div><div className="flex gap-2"><select value={item.role} onChange={(event) => changeRole(item, event.target.value)} className="rounded border border-slate-300 px-2 py-1.5 text-xs"><option value="student">Student</option><option value="authority">Authority</option><option value="library">Library</option><option value="admin">Admin</option></select><button type="button" onClick={() => toggleUser(item)} className="rounded border border-slate-300 px-3 py-1.5 text-xs font-semibold">{item.isActive ? "Deactivate" : "Activate"}</button></div></div>)}</div></div>
    </Container>
  </>;
}
