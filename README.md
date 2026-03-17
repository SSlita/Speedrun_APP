
# Speedrun Guide App

Application de gestion de guides de speedrun avec upload d'images et vidéos sur Cloudinary.

## Structure du projet

- `/frontend` - Application React + Vite
- `/backend` - API Node.js + Express + MongoDB

## Installation

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

## Configuration requise

- Node.js 18+
- MongoDB
- Compte Cloudinary

## Variables d'environnement

Voir `.env.example` dans chaque dossier.
