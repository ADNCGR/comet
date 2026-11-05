# Comment Supprimer les Variables STORAGE_URL sur Vercel

## 🔍 Problème

Quand vous essayez de supprimer les variables `STORAGE_URL_*` ou `NEXT_PUBLIC_STORAGE_URL_*`, Vercel vous dit :
> "You can remove this environment variable by disconnecting the project from the connected store."

C'est parce que ces variables sont créées automatiquement par une **intégration Vercel Storage** ou **Supabase**.

## ✅ Solution : Déconnecter l'Intégration

### Option 1 : Via Settings → Integrations

1. Allez sur Vercel → votre projet **comet-morocco-elevate**
2. Cliquez sur **Settings** (en haut)
3. Dans le menu de gauche, cliquez sur **Integrations**
4. Cherchez les intégrations liées à :
   - **Vercel Postgres** (Storage)
   - **Supabase** (si connecté)
   - **Vercel Storage** (Postgres, Blob, etc.)
5. Pour chaque intégration que vous ne voulez plus :
   - Cliquez sur l'intégration
   - Cherchez un bouton **"Disconnect"** ou **"Remove"**
   - Confirmez la déconnexion

### Option 2 : Via Storage Dashboard

1. Allez sur Vercel → votre projet
2. Cliquez sur l'onglet **Storage** (en haut de la page)
3. Si vous avez des stores (Postgres, Blob, etc.) :
   - Cliquez sur chaque store
   - Cherchez **"Delete"** ou **"Remove"**
   - Supprimez les stores que vous n'utilisez pas

### Option 3 : Via Environment Variables (méthode directe)

1. Allez sur **Settings** → **Environment Variables**
2. Cliquez sur les **3 points** (⋯) à droite d'une variable `STORAGE_URL_*`
3. Si vous voyez **"Remove"** dans le tooltip :
   - Cliquez sur **"Remove"**
   - Cela devrait déconnecter l'intégration automatiquement

## ⚠️ Important

**Avant de supprimer**, assurez-vous que :
- ✅ Vous n'utilisez **PAS** Vercel Storage dans votre application
- ✅ Vous n'utilisez **PAS** Supabase Storage
- ✅ Vous n'avez **PAS** besoin de base de données Postgres sur Vercel

Si vous n'utilisez que **Web3Forms** pour le formulaire de contact, vous n'avez **PAS besoin** de ces stores.

## ✅ Après la Déconnexion

Une fois l'intégration déconnectée :
1. Les variables `STORAGE_URL_*` seront automatiquement supprimées
2. Vous n'aurez plus que `VITE_WEB3FORMS_ACCESS_KEY` (si vous l'avez ajoutée)
3. Votre application fonctionnera toujours normalement

## 📋 Checklist

- [ ] Vérifier que vous n'utilisez pas Vercel Storage
- [ ] Aller dans Settings → Integrations
- [ ] Déconnecter les intégrations Storage/Supabase
- [ ] Vérifier que les variables `STORAGE_URL_*` ont disparu
- [ ] Vérifier que `VITE_WEB3FORMS_ACCESS_KEY` est toujours là

## 💡 Note

Si vous ne trouvez pas l'option "Disconnect" :
- Les stores peuvent être dans l'onglet **Storage** en haut de la page du projet
- Ou dans **Settings** → **Storage** (si cette option existe)
- Ou dans le dashboard Vercel principal → **Storage**

Une fois déconnecté, les variables seront automatiquement supprimées !

