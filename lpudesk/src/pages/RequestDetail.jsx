import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { requestsApi, apiRequest } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function RequestDetail() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) requestsApi.detail(id).then(setData).catch((requestError) => setError(requestError.message));
  }, [id, user]);

  if (loading) return <Container className="py-16 text-center text-slate-500">Loading…</Container>;
  if (!user) return <Navigate to="/auth" replace />;
  if (error) return <Container className="py-16 text-center text-red-700">{error}</Container>;
  if (!data) return <Container className="py-16 text-center text-slate-500">Loading request…</Container>;

  async function sendMessage(event) {
    event.preventDefault();
    if (!message.trim()) return;
    try {
      const result = await apiRequest(`/requests/${id}/messages`, { method: "POST", body: { body: message } });
      setData({ ...data, messages: [...data.messages, result.message] });
      setMessage("");
    } catch (sendError) {
      setError(sendError.message);
    }
  }

  return (
    <>
      <PageHeader eyebrow={data.request.ticketNumber || data.request.category} title={data.request.title} description={`Status: ${data.request.status.replace("_", " ")} · ${data.request.priority} priority`} />
      <Container className="max-w-3xl space-y-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{data.request.description}</p><div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:grid-cols-3"><span>Type: <strong className="capitalize text-slate-700">{data.request.type || data.request.category}</strong></span><span>Location: <strong className="text-slate-700">{data.request.location || "Not provided"}</strong></span><span>Submitted: <strong className="text-slate-700">{data.request.anonymous ? "Anonymous" : "Identified"}</strong></span></div>{data.request.resolution && <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"><strong>Resolution:</strong> {data.request.resolution}</p>}</div>
        <div className="space-y-3">
          {data.messages.map((item) => <div key={item._id} className="rounded-xl bg-white p-4 ring-1 ring-slate-200"><p className="text-xs font-semibold text-brand-700">{item.sender?.name || "CampusConnect"} · {new Date(item.createdAt).toLocaleString()}</p><p className="mt-2 text-sm text-slate-700">{item.body}</p></div>)}
        </div>
        <form onSubmit={sendMessage} className="flex gap-3"><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Add a message" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm" /><button className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white">Send</button></form>
      </Container>
    </>
  );
}
