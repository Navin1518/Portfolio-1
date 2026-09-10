import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { requestsApi } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

const initialForm = { title: "", description: "", type: "complaint", category: "other", location: "", priority: "medium", anonymous: false };

export default function Requests() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) requestsApi.list().then(({ requests: items }) => setRequests(items)).catch((requestError) => setError(requestError.message));
  }, [user]);

  if (loading) return <Container className="py-16 text-center text-slate-500">Loading…</Container>;
  if (!user) return <Navigate to="/auth" state={{ from: "/requests" }} replace />;

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      const result = await requestsApi.create(form);
      setRequests([result.request, ...requests]);
      setForm(initialForm);
      setSubmitted(true);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <>
      <PageHeader eyebrow="CampusConnect" title="Complaints & suggestions" description={`Signed in as ${user.name}. Submit an issue and follow its progress from one place.`} />
      <Container className="grid gap-8 py-10 lg:grid-cols-5">
        {user.role === "student" && <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="font-semibold text-slate-800">Submit a request</h2>
          <input required placeholder="Short title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
          <textarea required minLength={10} placeholder="Describe what happened or your idea" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-h-32 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"><option value="complaint">Complaint</option><option value="suggestion">Suggestion</option></select>
            <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"><option value="other">General</option><option value="library">Library</option><option value="facility">Facility</option><option value="academic">Academic</option></select>
          </div>
          <input placeholder="Location (building, room or service)" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm" />
          <div className="flex items-center justify-between gap-3">
            <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select>
            <label className="flex gap-2 text-xs text-slate-600"><input type="checkbox" checked={form.anonymous} onChange={(event) => setForm({ ...form, anonymous: event.target.checked })} /> Submit anonymously</label>
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          {submitted && <p className="text-sm text-emerald-700">Request submitted successfully.</p>}
          <button className="w-full rounded-lg bg-brand-700 px-4 py-3 text-sm font-semibold text-white">Submit request</button>
        </form>}
        <section className={`space-y-4 ${user.role === "student" ? "lg:col-span-3" : "lg:col-span-5"}`}>
          <h2 className="font-semibold text-slate-800">{user.role === "student" ? "Your requests" : "Staff work queue"}</h2>
          {requests.length === 0 ? <p className="rounded-xl bg-white p-6 text-sm text-slate-500 ring-1 ring-slate-200">No visible requests yet.</p> : requests.map((request) => (
            <div key={request._id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-300">
              <button onClick={() => navigate(`/requests/${request._id}`)} className="block w-full text-left">
                <div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-slate-800">{request.title}</h3><span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold capitalize text-brand-700">{request.status.replace("_", " ")}</span></div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{request.description}</p>
                <p className="mt-3 text-xs capitalize text-slate-400">{request.ticketNumber || "Ticket pending"} · {request.type || request.category} · {request.priority} priority{request.location ? ` · ${request.location}` : ""}</p>
              </button>
              {user.role !== "student" && <StaffControls request={request} onUpdated={(updated) => setRequests(requests.map((item) => item._id === updated._id ? updated : item))} />}
            </div>
          ))}
        </section>
      </Container>
    </>
  );
}

function StaffControls({ request, onUpdated }) {
  const [status, setStatus] = useState(request.status);
  const [priority, setPriority] = useState(request.priority);
  const [resolution, setResolution] = useState(request.resolution || request.resolutionNote || "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const result = await requestsApi.update(request._id, { status, priority, resolution });
      onUpdated(result.request);
    } finally {
      setSaving(false);
    }
  }

  return <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
    <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded border border-slate-300 px-2 py-1 text-xs"><option value="submitted">Submitted</option><option value="under_review">Under review</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option><option value="rejected">Rejected</option></select>
    <select value={priority} onChange={(event) => setPriority(event.target.value)} className="rounded border border-slate-300 px-2 py-1 text-xs"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select>
    <input value={resolution} onChange={(event) => setResolution(event.target.value)} placeholder="Resolution note" className="min-w-40 flex-1 rounded border border-slate-300 px-2 py-1 text-xs" />
    <button type="button" onClick={save} disabled={saving} className="rounded bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
  </div>;
}
