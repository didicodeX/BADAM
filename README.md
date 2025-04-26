# BADAM

```markdown
# BADAM - Plateforme d'apprentissage en petit groupe

## 🚀 Tech Stack
- React (Vite.js)
- JavaScript (JSX)
- Tailwind CSS v3
- Axios
- Zustand
- Tanstack Query
- Zod (validation de formulaires)
- React Router DOM
- Sonner (toast notifications)
- Swiper.js (carousels)

## 🏗️ Structure
Architecture modulaire **Feature-Based**:

- `features/` : Chaque feature isolée (auth, dashboard, formations, etc.)
- `shared/` : Composants, hooks, config, utils partagés globalement
- `app/` : Layouts globaux, Routing principal

## 📚 Règles principales
- Utiliser **React Query** pour le data fetching.
- Utiliser **Zustand** pour l'état global (user connecté, modale ouverte).
- Utiliser **Zod** pour valider tous les formulaires.
- Centraliser toutes les requêtes API via une instance Axios (`/shared/lib/axios.js`).

## ⚙️ Installation
```bash
npm install
npm run dev
```

## 🧪 À venir
- Pages formations et sessions
- Système d'avis
- Notifications utilisateur
- Dashboard avancé (stats, sessions récentes)

## 📩 Contributions
Pull Requests et Issues sont les bienvenues ✨

---

**Projet encadré avec amour pour garantir qualité et évolutivité.** 💻✨
```
