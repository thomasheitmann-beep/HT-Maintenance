import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase.js";

const BRAND_BLUE = "#0A5DA8";

// Enveloppe l'app : tant que personne n'est authentifié, affiche l'écran de connexion.
// Une fois connecté, rend les enfants et fournit { user, logout } via la prop render function.
export default function AuthGate({ children }) {
  const [user, setUser] = useState(undefined); // undefined = chargement, null = déconnecté
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setError(
        err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found"
          ? "E-mail ou mot de passe incorrect."
          : "Connexion impossible pour le moment."
      );
    } finally {
      setBusy(false);
    }
  }

  if (user === undefined) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0B0F14", color: "#8B96A3", fontFamily: "-apple-system, sans-serif" }}>
        Chargement…
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0B0F14", fontFamily: "-apple-system, sans-serif", padding: 20 }}>
        <form onSubmit={handleSubmit} style={{ background: "#151B23", border: "1px solid #232B36", borderRadius: 16, padding: 32, width: "100%", maxWidth: 360 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>HT Maintenance</div>
          <div style={{ fontSize: 13, color: "#8B96A3", marginBottom: 24 }}>Connexion technicien</div>
          <label style={{ display: "block", fontSize: 12, color: "#8B96A3", marginBottom: 6 }}>E-mail</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus
            style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #2A3340", background: "#0F141A", color: "#FFFFFF", fontSize: 14, marginBottom: 16, boxSizing: "border-box" }}
          />
          <label style={{ display: "block", fontSize: 12, color: "#8B96A3", marginBottom: 6 }}>Mot de passe</label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #2A3340", background: "#0F141A", color: "#FFFFFF", fontSize: 14, marginBottom: 16, boxSizing: "border-box" }}
          />
          {error && <div style={{ color: "#E05252", fontSize: 12.5, marginBottom: 14 }}>{error}</div>}
          <button type="submit" disabled={busy} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: "none", background: BRAND_BLUE, color: "#FFFFFF", fontSize: 14, fontWeight: 700, cursor: busy ? "default" : "pointer", opacity: busy ? 0.7 : 1 }}>
            {busy ? "Connexion…" : "Se connecter"}
          </button>
          <div style={{ fontSize: 11, color: "#5B6B7D", marginTop: 16, lineHeight: 1.5 }}>
            Pas encore de compte ? Demandez à votre responsable de vous en créer un depuis la console Firebase.
          </div>
        </form>
      </div>
    );
  }

  return children({ user, logout: () => signOut(auth) });
}
