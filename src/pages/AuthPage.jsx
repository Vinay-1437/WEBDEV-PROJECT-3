import { useMemo, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const initialLogin = {
  email: "",
  password: "",
};

const initialSignup = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const getAuthErrorMessage = (code) => {
  if (code === "auth/invalid-email") return "Invalid email format.";
  if (code === "auth/missing-password") return "Password is required.";
  if (code === "auth/invalid-credential") return "Incorrect email or password.";
  if (code === "auth/email-already-in-use") return "Email is already registered.";
  if (code === "auth/weak-password") return "Password should be at least 6 characters.";
  return "Authentication failed. Please try again.";
};

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === "login";

  const title = useMemo(
    () => (isLogin ? "Login to SubScribe" : "Create your SubScribe account"),
    [isLogin]
  );

  const subtitle = useMemo(
    () =>
      isLogin
        ? "Continue tracking your subscription spending."
        : "Start managing all your subscriptions in one place.",
    [isLogin]
  );

  const handleLoginChange = (key, value) => {
    setLoginForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignupChange = (key, value) => {
    setSignupForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!loginForm.email || !loginForm.password) {
      setError("Please enter email and password.");
      return;
    }
    try {
      setIsSubmitting(true);
      await signInWithEmailAndPassword(auth, loginForm.email.trim(), loginForm.password);
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      setError("Please fill all fields.");
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setIsSubmitting(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        signupForm.email.trim(),
        signupForm.password
      );
      await updateProfile(credential.user, { displayName: signupForm.name.trim() });
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/30">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>

        <div className="mb-5 grid grid-cols-2 rounded-xl border border-slate-700 bg-slate-950 p-1">
          <button
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              isLogin ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setError("");
            }}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              !isLogin ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">Email</span>
              <input
                required
                type="email"
                value={loginForm.email}
                onChange={(e) => handleLoginChange("email", e.target.value)}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-indigo-500 focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">Password</span>
              <input
                required
                type="password"
                value={loginForm.password}
                onChange={(e) => handleLoginChange("password", e.target.value)}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-indigo-500 focus:ring-2"
              />
            </label>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              {isSubmitting ? "Please wait..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">Name</span>
              <input
                required
                value={signupForm.name}
                onChange={(e) => handleSignupChange("name", e.target.value)}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-indigo-500 focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">Email</span>
              <input
                required
                type="email"
                value={signupForm.email}
                onChange={(e) => handleSignupChange("email", e.target.value)}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-indigo-500 focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">Password</span>
              <input
                required
                type="password"
                value={signupForm.password}
                onChange={(e) => handleSignupChange("password", e.target.value)}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-indigo-500 focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">Confirm Password</span>
              <input
                required
                type="password"
                value={signupForm.confirmPassword}
                onChange={(e) => handleSignupChange("confirmPassword", e.target.value)}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-indigo-500 focus:ring-2"
              />
            </label>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              {isSubmitting ? "Please wait..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

export default AuthPage;
