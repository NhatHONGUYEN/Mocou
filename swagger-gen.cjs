/* eslint-disable */
// Script de génération OpenAPI via swagger-autogen pour Next.js (app router)
// Utilise une liste de fichiers de routes pour l'analyse statique.

const path = require("path");
const fs = require("fs");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = path.resolve(__dirname, "public", "openapi.json");

// Définition de base du document
const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://mocou.vercel.app"
    : "http://localhost:3000";

const doc = {
  info: {
    title: "Mocou API",
    description:
      "Documentation générée automatiquement depuis les routes sous app/api via swagger-autogen.",
    version: "1.0.0",
  },
  servers: [
    {
      url: serverUrl,
      description:
        process.env.NODE_ENV === "production" ? "Production" : "Développement",
    },
  ],
  tags: [
    { name: "Auth", description: "Authentification et utilisateurs" },
    { name: "Categories", description: "Catégories de mots" },
    { name: "Words", description: "Gestion des mots" },
    { name: "Scores", description: "Scores et leaderboard" },
  ],
  components: {},
};

// Fichiers à scanner: on cible explicitement les handlers Next (route.ts)
const routes = [
  "app/api/categories/route.ts",
  "app/api/word/route.ts",
  "app/api/scores/route.ts",
  "app/api/auth/check-user/route.ts",
  "app/api/auth/signUp/route.ts",
  // Ajoutez d'autres routes si nécessaire
].map((p) => path.resolve(__dirname, p));

// S'assurer que le dossier de sortie existe
const outDir = path.dirname(outputFile);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

swaggerAutogen(outputFile, routes, doc).then(() => {
  // Compléter minimalement si aucun path n'est trouvé
  try {
    const raw = fs.readFileSync(outputFile, "utf-8");
    const spec = JSON.parse(raw);
    spec.openapi = spec.openapi || "3.0.0";
    spec.info = spec.info || doc.info;
    // Choisir le serveur en fonction de l'environnement
    spec.servers = [
      {
        url: serverUrl,
        description:
          process.env.NODE_ENV === "production"
            ? "Production"
            : "Développement",
      },
    ];
    spec.paths = spec.paths || {};

    // Retirer tout schéma de sécurité pour masquer le bouton Authorize
    if (!spec.components) spec.components = {};
    if (spec.components.securitySchemes) {
      delete spec.components.securitySchemes;
    }

    // Injecter des endpoints minimaux si vides
    if (Object.keys(spec.paths).length === 0) {
      spec.paths["/api/categories"] = {
        get: {
          tags: ["Categories"],
          summary: "Lister les catégories",
          responses: {
            200: { description: "OK" },
          },
        },
      };
      spec.paths["/api/word"] = {
        get: {
          tags: ["Words"],
          summary: "Lister les mots par catégorie",
          parameters: [
            {
              in: "query",
              name: "category",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "OK" },
            400: { description: "Mauvaise requête" },
            404: { description: "Non trouvé" },
          },
        },
      };
      spec.paths["/api/scores"] = {
        get: {
          tags: ["Scores"],
          summary: "Lister les scores",
          parameters: [
            {
              in: "query",
              name: "userId",
              required: false,
              schema: { type: "string" },
            },
            {
              in: "query",
              name: "category",
              required: false,
              schema: { type: "string" },
            },
          ],
          responses: { 200: { description: "OK" } },
        },
        post: {
          tags: ["Scores"],
          summary: "Créer un score",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    userId: { type: "string" },
                    score: { type: "number" },
                    category: { type: "string" },
                  },
                  required: ["userId", "score", "category"],
                },
              },
            },
          },
          responses: {
            201: { description: "Créé" },
            400: { description: "Mauvaise requête" },
          },
        },
      };
      spec.paths["/api/auth/check-user"] = {
        post: {
          tags: ["Auth"],
          summary: "Vérifier l'existence d'un utilisateur",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { email: { type: "string", format: "email" } },
                  required: ["email"],
                },
              },
            },
          },
          responses: { 200: { description: "OK" } },
        },
      };
      spec.paths["/api/auth/signUp"] = {
        post: {
          tags: ["Auth"],
          summary: "Inscription d'un utilisateur",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    password: { type: "string", format: "password" },
                  },
                  required: ["name", "email", "password"],
                },
              },
            },
          },
          responses: {
            201: { description: "Créé" },
            400: { description: "Conflit / invalide" },
          },
        },
      };
    }

    fs.writeFileSync(outputFile, JSON.stringify(spec, null, 2));
  } catch (err) {
    console.warn("Post-traitement OpenAPI échoué:", err?.message);
  }
});
