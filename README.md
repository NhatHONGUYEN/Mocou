# 🇰🇷 Mocou - Jeu d'apprentissage du vocabulaire coréen

**Mocou** est une application web ludique et interactive qui vous aide à apprendre le vocabulaire coréen de manière amusante, avec Pochacco 🐶 comme guide de votre aventure linguistique !

## 🎯 À propos de Mocou

Mocou (모구) est une plateforme d'apprentissage du coréen qui transforme l'étude du vocabulaire en jeu captivant. L'application propose un système de points, des catégories thématiques, et un compagnon mascotte adorable pour rendre l'apprentissage plus engageant.

### ✨ Fonctionnalités principales

- 🎮 **Jeu interactif** : Traduisez des mots coréens et gagnez des points
- 🐶 **Pochacco comme mascotte** : Personnage Sanrio qui vous accompagne dans votre apprentissage
- 📚 **Catégories thématiques** : Apprenez par thèmes (aliments, objets du quotidien, etc.)
- 🏆 **Système de scores** : Suivez votre progression et défiez les autres joueurs
- 👤 **Comptes utilisateur** : Sauvegardez vos scores et consultez votre historique
- 📊 **Classement** : Comparez vos performances avec la communauté
- 💡 **Système d'indices** : Aide contextuelle pour les mots difficiles

## 🛠️ Technologies utilisées

### Frontend

- **Next.js 15.2.0** - Framework React avec App Router
- **React 19.0.0** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI accessibles
- **Zustand** - Gestion d'état globale
- **TanStack Query** - Gestion des données serveur
- **Motion** - Animations fluides
- **Lucide React** - Icônes

### Backend

- **Next.js API Routes** - API REST
- **Prisma** - ORM et gestion de base de données
- **PostgreSQL** - Base de données relationnelle
- **NextAuth.js** - Authentification
- **Argon2** - Hachage sécurisé des mots de passe
- **Zod** - Validation des données

### Outils de développement

- **ESLint** - Linting du code
- **PostCSS** - Traitement CSS
- **Swagger UI** - Documentation API
- **shadcn/ui** - Système de composants UI

## 📁 Structure du projet

```
Mocou/
├── app/                          # App Router Next.js
│   ├── (auth)/                   # Routes d'authentification
│   │   ├── sign-in/             # Page de connexion
│   │   └── sign-up/             # Page d'inscription
│   ├── api/                     # API Routes
│   │   ├── auth/                # Authentification
│   │   ├── categories/          # Gestion des catégories
│   │   ├── scores/              # Système de scores
│   │   └── word/                # Gestion des mots
│   ├── docs/                    # Documentation Swagger
│   ├── game/                    # Pages de jeu
│   ├── history/                 # Historique des scores
│   ├── leaderboard/             # Classement
│   └── lessons/                 # Leçons par catégorie
├── src/
│   ├── components/              # Composants React
│   │   ├── ui/                 # Composants UI de base
│   │   └── ...                 # Composants métier
│   ├── hooks/                  # Hooks personnalisés
│   ├── lib/                    # Utilitaires et configuration
│   └── store/                  # État global (Zustand)
├── prisma/                     # Schéma et migrations DB
├── public/                     # Assets statiques
└── animation/                  # Variantes d'animation
```

## 🎮 Comment jouer

L'application Mocou est accessible directement en ligne. Aucune installation n'est requise !

### Pour les visiteurs

1. **Accédez à la page d'accueil** et cliquez sur "🎮 C'est parti !"
2. **Choisissez une catégorie** de mots (ex: aliments, objets du quotidien)
3. **Traduisez les mots coréens** affichés en français
4. **Gagnez des points** pour chaque bonne réponse
5. **Utilisez les indices** si vous bloquez sur un mot
6. **Consultez votre score final** à la fin de la partie

### Pour les utilisateurs connectés

1. **Créez un compte** ou connectez-vous
2. **Vos scores sont sauvegardés** automatiquement
3. **Consultez votre historique** dans la section "Historique"
4. **Défiez les autres joueurs** via le classement
5. **Suivez votre progression** au fil du temps

## 🏗️ Architecture de l'application

### Frontend (Client-side)

- **Pages statiques** pour l'accueil, la documentation
- **Pages dynamiques** pour les jeux par catégorie
- **État global** géré par Zustand pour la logique de jeu
- **Gestion des données** avec TanStack Query pour les API calls
- **Authentification** via NextAuth.js avec sessions JWT

### Backend (Server-side)

- **API Routes** Next.js pour les endpoints REST
- **Authentification** avec NextAuth.js et Argon2
- **Base de données** PostgreSQL avec Prisma ORM
- **Validation** des données avec Zod
- **Sécurité** : hachage des mots de passe, validation des entrées

### Base de données

```sql
-- Principales tables
Users (utilisateurs)
├── id, name, email, password, score
├── accounts (OAuth)
├── sessions (sessions)
└── scores (scores par partie)

WordList (listes de mots par catégorie)
└── words (mots individuels avec traductions)

Score (scores des parties)
├── userId, score, category, createdAt
```

## 🔌 API Endpoints

### Authentification

- `POST /api/auth/signUp` - Inscription utilisateur
- `POST /api/auth/check-user` - Vérifier l'existence d'un utilisateur
- `GET/POST /api/auth/[...nextauth]` - Routes NextAuth.js

### Données de jeu

- `GET /api/categories` - Récupérer toutes les catégories
- `GET /api/word?category=<nom>` - Récupérer les mots d'une catégorie
- `GET/POST /api/scores` - Gérer les scores des utilisateurs

### Documentation

- `GET /api-docs/openapi.json` - Spécification OpenAPI
- `GET /docs` - Interface Swagger UI

## 🎨 Interface utilisateur

### Design System

- **Palette de couleurs** : Thème sombre/clair adaptatif
- **Typographie** : Fonts Google (Archivo Black, Lexend Mega)
- **Composants** : shadcn/ui pour l'accessibilité et la cohérence
- **Animations** : Transitions fluides avec Motion
- **Responsive** : Design adaptatif mobile-first

### Composants principaux

- `Hero` - Section d'accueil avec mascotte
- `GameCategory` - Interface de jeu principale
- `WordCard` - Carte d'affichage des mots
- `EndGameModal` - Modal de fin de partie
- `Leaderboard` - Classement des joueurs

## 🔒 Sécurité

### Authentification

- **Hachage des mots de passe** avec Argon2
- **Sessions JWT** sécurisées
- **Validation des entrées** avec Zod
- **Protection CSRF** intégrée

### Base de données

- **Requêtes préparées** via Prisma
- **Index optimisés** pour les performances
- **Relations de données** avec contraintes d'intégrité

## 📊 Performance

### Optimisations

- **Static Generation** pour les pages publiques
- **Code splitting** automatique avec Next.js
- **Lazy loading** des composants
- **Optimisation des images** avec Next.js Image
- **Mise en cache** des requêtes API

### Monitoring

- **Build optimisé** pour la production
- **Bundle analyzer** pour optimiser la taille
- **Lighthouse** pour les métriques de performance

## 📚 Documentation

### Documentation API

- **[Documentation Swagger](https://mocou.vercel.app/docs)** - Interface interactive pour tester les API
- **[Spécification OpenAPI](https://mocou.vercel.app/api-docs/openapi.json)** - Documentation technique des endpoints

### Qualité du code

- **Typage strict** TypeScript pour éviter les erreurs
- **Interfaces définies** pour tous les composants
- **Validation runtime** avec Zod

## 📝 Scripts disponibles

```bash
# Développement
npm run dev          # Serveur de développement avec Turbopack
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linting ESLint

# Base de données
npx prisma generate  # Générer le client Prisma
npx prisma migrate   # Appliquer les migrations
npx prisma studio    # Interface graphique DB

# Documentation
npm run docs:gen     # Générer la documentation API
```

## 🎯 Roadmap

### Fonctionnalités futures

- 🌍 **Multi-langues** : Ajouter d'autres langues (japonais, chinois)
- 🎵 **Audio** : Prononciation des mots coréens
- 📱 **Application mobile** : Version React Native
- 🎨 **Thèmes personnalisés** : Plus de variantes visuelles
- 🏆 **Badges et récompenses** : Système de gamification avancé
- 👥 **Mode multijoueur** : Parties en temps réel
- 📈 **Analytics** : Statistiques détaillées de progression

## 📞 Support

Pour toute question ou problème :

- 📧 **Email** : [votre-email]
- 🐛 **Issues** : [GitHub Issues]
- 📖 **Documentation** : `/docs` dans l'application

## 📝 Crédits

**Mascotte Pochacco** : Ce projet utilise la mascotte Pochacco de Sanrio comme personnage d'accompagnement pour l'apprentissage. Pochacco est une marque déposée de Sanrio Co., Ltd. Ce projet est à des fins éducatives et non commerciales. Pour plus d'informations sur Sanrio et ses personnages, visitez [sanrio.com](https://www.sanrio.com).
