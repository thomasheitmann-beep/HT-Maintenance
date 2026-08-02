# HT Maintenance — déploiement

## Ce que contient ce dossier
- `src/App.jsx` : l'application (le même code que dans Claude)
- `src/storagePolyfill.js` : remplace le stockage propre à Claude par le
  stockage du navigateur (localStorage), pour que l'app fonctionne une fois
  déployée. **Limite à connaître : les données restent alors uniquement sur
  l'appareil utilisé — pas de synchronisation entre plusieurs téléphones/PC.**
  C'est volontairement laissé simple pour ce premier déploiement ; on pourra
  brancher une vraie base de données partagée ensuite.
- Le reste (`package.json`, `vite.config.js`, `index.html`, `src/main.jsx`) :
  fichiers techniques standards d'un projet React/Vite, à ne pas modifier.

## Tester en local (optionnel, avant de déployer)
Prérequis : installer Node.js (https://nodejs.org, version LTS).

```bash
npm install
npm run dev
```
Puis ouvrez l'adresse affichée dans le terminal (ex. http://localhost:5173).

## Déployer sur Vercel (gratuit)
1. Créez un compte sur https://vercel.com (connexion possible avec un compte GitHub)
2. Mettez ce dossier dans un dépôt GitHub :
   - Créez un nouveau dépôt sur https://github.com/new
   - Dans ce dossier, lancez :
     ```bash
     git init
     git add .
     git commit -m "HT Maintenance - premier déploiement"
     git branch -M main
     git remote add origin <URL_DE_VOTRE_DEPOT_GITHUB>
     git push -u origin main
     ```
3. Sur Vercel : "Add New..." → "Project" → sélectionnez ce dépôt GitHub
4. Vercel détecte automatiquement Vite : laissez les réglages par défaut
5. Cliquez "Deploy" — au bout de 1 à 2 minutes, Vercel vous donne une adresse
   du type `https://ht-maintenance.vercel.app`
6. Chaque fois que vous repousserez du code sur GitHub (`git push`), Vercel
   redéploiera automatiquement la nouvelle version.

## Prochaine étape suggérée
Remplacer `storagePolyfill.js` par une vraie base de données partagée
(ex. Firebase, Supabase) pour que toute l'équipe voie les mêmes données,
sur n'importe quel appareil.

## Fonctionnement hors ligne (PWA)
L'application est maintenant une "Progressive Web App" : une fois ouverte au
moins une fois avec une connexion internet, elle peut ensuite être utilisée
sans connexion.

### Installer sur l'écran d'accueil (iPhone / Android)
- **iPhone (Safari)** : ouvrez le site → bouton Partager → "Sur l'écran d'accueil"
- **Android (Chrome)** : ouvrez le site → menu ⋮ → "Ajouter à l'écran d'accueil"

Une icône HT Maintenance apparaît alors, et l'app s'ouvre en plein écran, sans
barre de navigateur.

### Ce qui fonctionne hors ligne
- Toute la saisie (sites, rapports, contrôles, photos, signatures) — déjà
  stockée localement sur l'appareil
- Le bouton "Rapport Word", **à condition d'avoir été utilisé au moins une
  fois avec une connexion active** (le module de génération Word est alors
  mis en cache pour les usages suivants)

### Après une mise à jour du code
Après chaque nouveau déploiement, il peut être nécessaire de fermer et
rouvrir complètement l'app (ou de faire glisser vers le bas pour rafraîchir)
pour que la nouvelle version hors-ligne soit bien téléchargée.
