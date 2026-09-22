# SpeedRun Guide App

Application web de guides de speedrun permettant de consulter des tutoriels étape par étape avec images et vidéos, hébergée sur une infrastructure auto-gérée sur Proxmox.

## 🏗️ Architecture

L'application tourne sur 6 machines virtuelles Ubuntu 22.04 sur un serveur Proxmox :

| VM | Rôle | IP |
|----|------|----|
| speedrun-proxy | Reverse proxy Nginx + Cloudflare Tunnel | 192.168.1.100 |
| speedrun-frontend | Frontend public React (lecture seule) | 10.10.10.2 |
| speedrun-backend | API Node.js + Express + PM2 | 10.10.10.3 |
| speedrun-mongodb | Base de données MongoDB | 10.10.10.4 |
| speedrun-media | Stockage médias MinIO (S3) | 10.10.10.5 |
| speedrun-admin | Frontend admin React (accès protégé) | 10.10.10.6 |

Les VMs internes communiquent sur un réseau privé isolé (`10.10.10.x`), seule la VM proxy est exposée à internet via Cloudflare Tunnel.

## 🛠️ Stack technique

**Frontend**
- React 18 + Vite
- styled-components
- Material UI
- React Query (TanStack)
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- MinIO SDK (stockage objet S3-compatible)
- Sharp (compression et conversion WebP automatique)
- Multer (gestion des uploads)
- PM2 (gestionnaire de processus)

**Infrastructure**
- Proxmox VE (hyperviseur)
- Ubuntu 22.04 Server
- Nginx (reverse proxy + cache)
- MinIO (stockage objet auto-hébergé, remplace Cloudinary)
- Cloudflare Tunnel (exposition publique HTTPS sans ouverture de ports)

## ✨ Fonctionnalités

**Interface publique**
- Consultation des jeux avec cover image
- Navigation par catégories
- Guides détaillés avec sections, étapes, images et vidéos
- Sommaire de navigation (sticky desktop / drawer mobile)
- Recherche de jeux

**Interface admin** (accès protégé)
- Création / modification / suppression de jeux, catégories, guides
- Upload d'images et vidéos avec compression automatique en WebP
- Gestion automatique du stockage MinIO (suppression, renommage)

## 📁 Structure du projet

```
/
├── frontend/          # Application React (frontend public)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── lib/
│   ├── .env.example
│   └── vite.config.js
│
└── backend/           # API REST Node.js
    ├── src/
    │   ├── config/    # MongoDB, MinIO
    │   ├── controllers/
    │   ├── models/
    │   └── routes/
    └── .env.example
```

## 🚀 Installation locale

### Prérequis
- Node.js 20+
- MongoDB
- MinIO (ou compte S3 compatible)

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Remplir les variables dans .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Remplir les variables dans .env
npm run dev
```

## ⚙️ Variables d'environnement

### Backend (`.env`)
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/speedrun
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=ton_access_key
MINIO_SECRET_KEY=ton_secret_key
MINIO_BUCKET=speedrun-medias
PUBLIC_URL=https://ton-domaine.com
```

### Frontend (`.env`)
```
VITE_API_URL=https://ton-domaine.com/api
```

## 🔒 Sécurité

- Frontend public séparé physiquement du frontend admin (deux VMs distinctes)
- Réseau interne isolé, aucune VM backend exposée directement
- Accès admin protégé par authentification HTTP basique Nginx
- Images et vidéos servies via proxy (MinIO non exposé directement)