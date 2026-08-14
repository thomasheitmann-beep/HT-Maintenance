import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDA5cCPZO2Wjfx-8YP4WFJQIUVIc-Qqb0",
  authDomain: "ht-maintenance.firebaseapp.com",
  projectId: "ht-maintenance",
  storageBucket: "ht-maintenance.firebasestorage.app",
  messagingSenderId: "273138950416",
  appId: "1:273138950416:web:eb32be0db419dbbfe8c595",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
// Le transport WebSocket par défaut de Firestore est bloqué de façon silencieuse dans certains
// environnements réseau (proxy, pare-feu, inspection SSL) : la connexion s'établit (statut 200)
// mais les écritures ne se terminent jamais, ni en succès ni en échec. On FORCE le long-polling
// (pas juste une détection automatique, qui peut se tromper) pour contourner ce blocage.
export const db = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});
