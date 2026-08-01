// Remplace window.storage (spécifique à l'environnement Claude) par une
// implémentation basée sur localStorage, pour que l'app fonctionne une fois
// déployée hors de Claude. Les données restent alors stockées uniquement
// dans le navigateur de l'appareil utilisé (pas de synchronisation entre
// plusieurs appareils/utilisateurs) — voir le README pour une vraie base
// de données partagée.
if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    async get(key) {
      const raw = localStorage.getItem(key);
      if (raw === null) throw new Error("key not found: " + key);
      return { key, value: raw, shared: false };
    },
    async set(key, value) {
      localStorage.setItem(key, value);
      return { key, value, shared: false };
    },
    async delete(key) {
      localStorage.removeItem(key);
      return { key, deleted: true, shared: false };
    },
    async list(prefix) {
      const keys = Object.keys(localStorage).filter((k) => !prefix || k.startsWith(prefix));
      return { keys, prefix, shared: false };
    },
  };
}
