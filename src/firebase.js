// Configuration Firebase — projet "HT-Maintenance".
// apiKey et les autres valeurs ci-dessous sont des clés PUBLIQUES côté client (normal pour
// Firebase) : la vraie sécurité est assurée par les règles Firestore (firestore.rules), qui
// n'autorisent la lecture/écriture qu'aux utilisateurs authentifiés (voir ce fichier à la racine
// du projet, à copier dans Firebase Console → Firestore Database → Règles).
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
// Le transport WebSocket par défaut de Firestore est parfois bloqué silencieusement par Safari/iOS
// ou certains réseaux mobiles (écritures qui ne partent jamais, sans erreur visible). On force le
// "long polling" (requêtes HTTP classiques) qui passe partout, au prix d'une latence négligeable.
export const db = initializeFirestore(firebaseApp, {
  experimentalAutoDetectLongPolling: true,
});
