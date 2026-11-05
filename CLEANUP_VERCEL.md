# Nettoyage des Variables d'Environnement sur Vercel

## ✅ Variables à GARDER

Ces variables sont nécessaires pour votre application :

- **`VITE_WEB3FORMS_ACCESS_KEY`** = `c7fffd68-38c0-4d2a-8795-e69c32b2ff29`
  - ⚠️ **IMPORTANT** : Si cette variable n'est pas là, ajoutez-la !
  - C'est la seule variable nécessaire pour le formulaire de contact

## ❌ Variables à SUPPRIMER (si elles existent)

Ces variables ne sont **plus utilisées** et peuvent être supprimées en toute sécurité :

### Variables Supabase (si vous ne les utilisez plus ailleurs)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- Toute variable commençant par `SUPABASE_`

### Variables Vercel Storage (si vous ne les utilisez pas)
- `STORAGE_URL_POSTGRES_*` (toutes les variables PostgreSQL)
- `STORAGE_URL_SUPABASE_*` (toutes les variables Supabase Storage)
- `NEXT_PUBLIC_STORAGE_URL_*` (si vous n'utilisez pas Next.js Storage)

## 📋 Comment Supprimer les Variables sur Vercel

1. Allez sur [vercel.com](https://vercel.com) → votre projet
2. **Settings** → **Environment Variables**
3. Pour chaque variable à supprimer :
   - Cliquez sur les **3 points** (⋯) à droite de la variable
   - Cliquez sur **Delete**
   - Confirmez la suppression

## ⚠️ Attention

**Avant de supprimer**, vérifiez que :
- Vous n'utilisez pas Supabase pour d'autres fonctionnalités (authentification, base de données, etc.)
- Vous n'utilisez pas Vercel Storage
- Vous n'avez pas d'autres services qui dépendent de ces variables

## ✅ Après le Nettoyage

Votre liste de variables d'environnement devrait contenir uniquement :
- `VITE_WEB3FORMS_ACCESS_KEY`

C'est tout ce dont vous avez besoin pour le formulaire de contact !

## 🔄 Redéploiement

Après avoir supprimé des variables, vous pouvez redéployer (optionnel) :
1. Allez dans **Deployments**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Cliquez sur **Redeploy**

Mais ce n'est pas obligatoire - la suppression des variables n'affecte que les futurs déploiements.

