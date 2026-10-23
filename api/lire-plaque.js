// Fonction serveur Vercel : lecture d'une plaque signalétique (photo) par l'IA Claude.
// La clé API reste côté serveur (ANTHROPIC_API_KEY). Seuls les utilisateurs autorisés peuvent l'utiliser.
import crypto from "node:crypto";

const PROJET_FIREBASE = "ht-maintenance";
const EMAILS_AUTORISES = (process.env.ALLOWED_EMAILS || "thomas.heitmann@orange.fr,mel_0701@hotmail.fr,dimitri.rougeboux@erd-btp.fr")
  .split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
const MODELE = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

let certificats = null, certificatsExpirent = 0;
async function certificatsGoogle() {
  if (certificats && Date.now() < certificatsExpirent) return certificats;
  const r = await fetch("https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com");
  if (!r.ok) throw new Error("certificats Google indisponibles");
  certificats = await r.json();
  const m = /max-age=(\d+)/.exec(r.headers.get("cache-control") || "");
  certificatsExpirent = Date.now() + (m ? Number(m[1]) * 1000 : 3600000);
  return certificats;
}
const b64url = (s) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");
async function verifierJeton(jeton) {
  const [h, p, sig] = String(jeton || "").split(".");
  if (!h || !p || !sig) throw new Error("jeton absent");
  const entete = JSON.parse(b64url(h).toString("utf8"));
  const charge = JSON.parse(b64url(p).toString("utf8"));
  if (entete.alg !== "RS256") throw new Error("algorithme invalide");
  const cert = (await certificatsGoogle())[entete.kid];
  if (!cert) throw new Error("certificat inconnu");
  const ok = crypto.createVerify("RSA-SHA256").update(`${h}.${p}`).verify(crypto.createPublicKey(cert), b64url(sig));
  if (!ok) throw new Error("signature invalide");
  const maintenant = Math.floor(Date.now() / 1000);
  if (charge.aud !== PROJET_FIREBASE || charge.iss !== `https://securetoken.google.com/${PROJET_FIREBASE}`) throw new Error("projet invalide");
  if (!(charge.exp > maintenant) || !(charge.iat <= maintenant + 300)) throw new Error("jeton expiré");
  return charge;
}

function consigne({ typeEquipement, contexte, champs }) {
  const liste = champs.map((c) => {
    const opts = Array.isArray(c.options) && c.options.length ? ` — valeurs connues (reprendre l'orthographe exacte si l'une correspond) : ${c.options.slice(0, 150).join(" | ")}` : "";
    return `- "${c.key}" : ${c.label}${opts}`;
  }).join("\n");
  return `Tu es technicien de maintenance électrique HTA/BT. La photo montre une plaque signalétique (ou une étiquette) d'un équipement de type « ${typeEquipement || "non précisé"} ».
${contexte ? `Contexte : ${contexte}\n` : ""}
Remplis UNIQUEMENT les champs suivants, à partir de ce qui est réellement lisible sur la photo :
${liste}

Règles :
- N'invente rien. Un champ absent ou illisible est simplement omis.
- Nombres : sans unité (l'unité attendue est dans le libellé), séparateur décimal point (ex. 21.5). Convertis si besoin (ex. 1,25 MVA → 1250 si le champ est en kVA).
- Si plusieurs valeurs existent selon la tension (ex. condensateur : kvar à 400/415/440 V), retiens celle qui correspond au contexte (tension du réseau) quand elle est indiquée.
- Mets dans "incertains" les clés dont la lecture est douteuse (caractères effacés, reflet, déduction).
Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour :
{"valeurs": {"cle": "valeur"}, "incertains": ["cle"], "texte": "transcription brute et complète de la plaque", "commentaire": "remarque utile éventuelle (ex. plaque partielle), sinon chaîne vide"}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ erreur: "Méthode non autorisée" }); return; }
  try {
    const jeton = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    const charge = await verifierJeton(jeton);
    const email = String(charge.email || "").toLowerCase();
    if (!EMAILS_AUTORISES.includes(email)) { res.status(403).json({ erreur: "Compte non autorisé à utiliser la lecture de plaque." }); return; }
  } catch (e) {
    res.status(401).json({ erreur: "Session invalide ou expirée : reconnectez-vous à l'application." });
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) { res.status(500).json({ erreur: "Clé ANTHROPIC_API_KEY absente des réglages Vercel." }); return; }
  const { image, mediaType = "image/jpeg", typeEquipement = "", contexte = "", champs = [] } = req.body || {};
  if (!image || typeof image !== "string" || image.length > 6000000) { res.status(400).json({ erreur: "Photo absente ou trop volumineuse." }); return; }
  const champsOk = (Array.isArray(champs) ? champs : []).filter((c) => c && typeof c.key === "string").slice(0, 60);
  if (!champsOk.length) { res.status(400).json({ erreur: "Aucun champ à remplir." }); return; }
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: MODELE,
        max_tokens: 2000,
        messages: [{ role: "user", content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: image } },
          { type: "text", text: consigne({ typeEquipement, contexte, champs: champsOk }) },
        ] }],
      }),
    });
    const j = await r.json();
    if (!r.ok) { res.status(502).json({ erreur: `Service de lecture indisponible (${(j && j.error && j.error.message) || r.status}).` }); return; }
    const texte = (j.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    const debut = texte.indexOf("{"), fin = texte.lastIndexOf("}");
    if (debut < 0 || fin < debut) { res.status(502).json({ erreur: "Réponse illisible, réessayez avec une photo plus nette." }); return; }
    const out = JSON.parse(texte.slice(debut, fin + 1));
    const cles = new Set(champsOk.map((c) => c.key));
    const valeurs = {};
    Object.entries(out.valeurs || {}).forEach(([k, v]) => { if (cles.has(k) && v !== null && v !== undefined && String(v).trim() !== "") valeurs[k] = String(v).trim(); });
    res.status(200).json({
      valeurs,
      incertains: (out.incertains || []).filter((k) => cles.has(k)),
      texte: String(out.texte || ""),
      commentaire: String(out.commentaire || ""),
    });
  } catch (e) {
    res.status(500).json({ erreur: "Lecture impossible pour le moment, réessayez." });
  }
}
