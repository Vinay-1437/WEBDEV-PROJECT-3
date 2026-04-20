import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsAuthLoading(false);
        return;
      }

      setUser({
        name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
        email: firebaseUser.email || "",
      });
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (isAuthLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-200">
        <p className="text-sm text-slate-400">Checking login...</p>
      </main>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;
