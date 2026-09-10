import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { authApi } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Auth() {
  const { user, login, register } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", identifier: "", email: "", password: "", confirmPassword: "", studentId: "", department: "", privacyConsent: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const strength = useMemo(() => passwordStrength(form.password), [form.password]);

  if (user && mode !== "verify") return <Navigate to="/requests" replace />;

  function update(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setError("");
    setMessage("");
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);
    try {
      if (mode === "login") {
        await login({ identifier: form.identifier, password: form.password });
        navigate(location.state?.from || "/requests");
      } else if (mode === "register") {
        const result = await register(form);
        setToken(result.verificationToken || "");
        setForm((previous) => ({ ...previous, verificationToken: result.verificationToken || "" }));
        setMode("verify");
        setMessage(result.verificationToken ? "Account created. Verify your email with the development token below." : "Account created. Check your email to verify your account.");
      } else if (mode === "forgot") {
        const result = await authApi.forgotPassword(form.email);
        setToken(result.resetToken || "");
        setMessage(result.message);
      } else {
        const result = await authApi.verifyEmail(form.verificationToken);
        setMessage(result.message);
        navigate("/requests");
      }
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setBusy(false);
    }
  }

  const isRegister = mode === "register";
  const isForgot = mode === "forgot";
  const isVerify = mode === "verify";

  return (
    <>
      <PageHeader eyebrow="CampusConnect" title={isForgot ? "Recover your account" : isVerify ? "Verify your email" : mode === "login" ? "Welcome back" : "Create your student account"} description="Submit and follow up on campus complaints and suggestions securely." />
      <Container className="py-10">
        <form onSubmit={submit} className="mx-auto max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {isRegister && (
            <>
              <Field label="Full name" value={form.name} onChange={(value) => update("name", value)} />
              <Field label="Student ID" value={form.studentId} onChange={(value) => update("studentId", value)} />
              <Field label="Department" value={form.department} onChange={(value) => update("department", value)} />
            </>
          )}
          {isForgot ? (
            <Field label="Account email" type="email" value={form.email} onChange={(value) => update("email", value)} />
          ) : isVerify ? (
            <Field label="Verification token" value={form.verificationToken || ""} onChange={(value) => update("verificationToken", value)} />
          ) : (
            <>
              <Field label={isRegister ? "Email" : "Email or student ID"} type={isRegister ? "email" : "text"} value={isRegister ? form.email : form.identifier} onChange={(value) => update(isRegister ? "email" : "identifier", value)} />
              <PasswordField label="Password" value={form.password} visible={showPassword} onToggle={() => setShowPassword(!showPassword)} onChange={(value) => update("password", value)} />
              {isRegister && <PasswordStrength score={strength} />}
              {isRegister && <PasswordField label="Confirm password" value={form.confirmPassword} visible={showPassword} onToggle={() => setShowPassword(!showPassword)} onChange={(value) => update("confirmPassword", value)} />}
            </>
          )}
          {isRegister && (
            <label className="flex gap-2 text-xs text-slate-600">
              <input type="checkbox" checked={form.privacyConsent} onChange={(event) => update("privacyConsent", event.target.checked)} required />
              I agree to the privacy notice and allow CampusConnect to process my request details.
            </label>
          )}
          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {message && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
          {token && <p className="break-all rounded-lg bg-amber-50 p-3 text-xs text-amber-800">Development token (email is not sent): {token}</p>}
          <button disabled={busy} className="w-full rounded-lg bg-brand-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
            {busy ? "Please wait…" : isForgot ? "Create reset token" : isVerify ? "Verify email" : mode === "login" ? "Sign in" : "Create account"}
          </button>
          {!isForgot && !isVerify && mode === "login" && <button type="button" onClick={() => setMode("forgot")} className="w-full text-sm text-slate-500">Forgot password?</button>}
          {isForgot && <button type="button" onClick={() => setMode("login")} className="w-full text-sm text-slate-500">Back to sign in</button>}
          {!isForgot && !isVerify && <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="w-full text-sm font-medium text-brand-700">{mode === "login" ? "Need an account? Register" : "Already registered? Sign in"}</button>}
          {mode !== "verify" && <button type="button" onClick={() => setMode("verify")} className="w-full text-xs text-slate-400">Have a verification token?</button>}
        </form>
      </Container>
    </>
  );
}

function Field({ label, type = "text", value, onChange }) {
  return <label className="block text-sm font-medium text-slate-700">{label}<input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label>;
}

function PasswordField({ label, value, visible, onToggle, onChange }) {
  return <label className="block text-sm font-medium text-slate-700">{label}<div className="mt-1 flex rounded-lg border border-slate-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100"><input required type={visible ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 rounded-lg px-3 py-2.5 outline-none" /><button type="button" onClick={onToggle} className="px-3 text-xs text-slate-500">{visible ? "Hide" : "Show"}</button></div></label>;
}

function passwordStrength(password) {
  return [password.length >= 8, /[A-Z]/.test(password), /\d/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
}

function PasswordStrength({ score }) {
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  return <p className="text-xs text-slate-500">Password strength: <span className="font-semibold">{labels[score]}</span></p>;
}
