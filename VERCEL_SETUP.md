# Configuration Vercel - Web3Forms

## ⚠️ IMPORTANT : Configuration de la variable d'environnement

Pour que le formulaire fonctionne sur Vercel, vous **DEVEZ** ajouter la variable d'environnement.

## 📋 Étapes à suivre sur Vercel

### 1. Accéder aux paramètres du projet

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet **comet-morocco-elevate**

### 2. Ajouter la variable d'environnement

1. Cliquez sur **Settings** (en haut de la page)
2. Dans le menu de gauche, cliquez sur **Environment Variables**
3. Cliquez sur **Add New** (bouton en haut à droite)

### 3. Remplir les informations

Remplissez le formulaire avec :

- **Key** (Nom de la variable) : 
  ```
  VITE_WEB3FORMS_ACCESS_KEY
  ```

- **Value** (Valeur) : 
  ```
  c7fffd68-38c0-4d2a-8795-e69c32b2ff29
  ```

- **Environments** (Cochez les 3 cases) :
  - ✅ **Production**
  - ✅ **Preview** 
  - ✅ **Development**

4. Cliquez sur **Save**

### 4. Redéployer l'application

**⚠️ CRUCIAL :** Après avoir ajouté la variable, vous **DEVEZ** redéployer !

**Option A : Redéploiement manuel (recommandé)**
1. Allez dans l'onglet **Deployments**
2. Trouvez le dernier déploiement
3. Cliquez sur les **3 points** (⋯) à droite
4. Cliquez sur **Redeploy**
5. Confirmez le redéploiement

**Option B : Déclencher un nouveau déploiement**
- Faites un petit changement dans le code et push sur GitHub
- Vercel redéploiera automatiquement

### 5. Vérifier que ça fonctionne

1. Attendez que le déploiement soit terminé (statut "Ready")
2. Allez sur votre site en production
3. Testez le formulaire de contact
4. Vous devriez recevoir un email !

## 🔍 Vérifier que la variable est bien configurée

1. Allez dans **Settings** → **Environment Variables**
2. Vous devriez voir `VITE_WEB3FORMS_ACCESS_KEY` dans la liste
3. Vérifiez que les 3 environnements sont cochés

## ❌ Problèmes courants

### "Clé API Web3Forms non configurée" en production

**Cause :** La variable d'environnement n'est pas configurée ou le site n'a pas été redéployé.

**Solution :**
1. Vérifiez que `VITE_WEB3FORMS_ACCESS_KEY` existe dans Environment Variables
2. Vérifiez que les 3 environnements sont cochés
3. **Redéployez** l'application après avoir ajouté/modifié la variable

### La variable est là mais ça ne marche toujours pas

**Solution :**
1. Vérifiez l'orthographe exacte : `VITE_WEB3FORMS_ACCESS_KEY` (avec VITE_ au début !)
2. Vérifiez que la valeur est correcte : `c7fffd68-38c0-4d2a-8795-e69c32b2ff29`
3. Supprimez et recréez la variable
4. Redéployez

### Comment voir les erreurs en production

1. Ouvrez la console du navigateur (F12)
2. Allez dans l'onglet **Console**
3. Soumettez le formulaire
4. Regardez les messages d'erreur détaillés

## ✅ Checklist

Avant de tester en production, vérifiez :

- [ ] Variable `VITE_WEB3FORMS_ACCESS_KEY` ajoutée sur Vercel
- [ ] Les 3 environnements sont cochés (Production, Preview, Development)
- [ ] La valeur est correcte : `c7fffd68-38c0-4d2a-8795-e69c32b2ff29`
- [ ] L'application a été **redéployée** après avoir ajouté la variable
- [ ] Le déploiement est terminé et en statut "Ready"

## 📞 Besoin d'aide ?

Si après avoir suivi ces étapes ça ne fonctionne toujours pas :
1. Vérifiez la console du navigateur (F12) pour voir les erreurs détaillées
2. Vérifiez les logs de déploiement sur Vercel
3. Assurez-vous que la clé API Web3Forms est toujours active sur [web3forms.com](https://web3forms.com)

