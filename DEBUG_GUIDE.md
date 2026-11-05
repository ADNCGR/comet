# Guide de Débogage - Formulaire de Contact

Ce guide vous explique comment déboguer les problèmes avec le formulaire de contact qui utilise Web3Forms.

## 🔍 Vérifier les Logs

### 1. Console du Navigateur (Principal)

La meilleure façon de déboguer est d'utiliser la console du navigateur :

1. **Ouvrir la console :**
   - Appuyez sur **F12** ou **Ctrl+Shift+I** (Windows) / **Cmd+Option+I** (Mac)
   - Allez dans l'onglet **Console**

2. **Ce que vous verrez :**
   - `Web3Forms API Key loaded: ✅ Yes` ou `❌ No` (en développement)
   - `Envoi du formulaire devis...` ou `Envoi du formulaire demo...`
   - `Response status: 200` (si ça fonctionne)
   - `Response data: {success: true, ...}` (si ça fonctionne)
   - Ou des messages d'erreur détaillés (si ça ne fonctionne pas)

3. **Vérifier les erreurs :**
   - Les erreurs apparaissent en rouge dans la console
   - Lisez le message d'erreur pour comprendre le problème

### 2. Vérifier les Emails Reçus

Pour voir si les soumissions fonctionnent :

1. **Vérifiez votre boîte email :**
   - Allez sur l'adresse email que vous avez utilisée pour créer votre compte Web3Forms
   - Vérifiez votre dossier spam/courrier indésirable
   - Les emails devraient arriver immédiatement après la soumission

2. **Vérifier sur Web3Forms :**
   - Allez sur [web3forms.com](https://web3forms.com)
   - Connectez-vous avec votre email
   - Vous pouvez voir les statistiques et l'historique des soumissions

## 🚨 Problèmes Courants

### Erreur : "Clé API Web3Forms non configurée"

**Causes possibles :**

1. **En développement local :**
   - Le fichier `.env` n'existe pas ou ne contient pas `VITE_WEB3FORMS_ACCESS_KEY`
   - Le serveur de développement n'a pas été redémarré après avoir ajouté la variable

2. **En production (Vercel) :**
   - La variable `VITE_WEB3FORMS_ACCESS_KEY` n'est pas configurée sur Vercel
   - L'application n'a pas été redéployée après avoir ajouté la variable

**Solution :**
- Vérifiez que la variable est bien définie
- Redémarrez le serveur de développement (local)
- Redéployez l'application (Vercel)

### Erreur : "Invalid access key" ou "Unauthorized"

**Cause :** La clé API est incorrecte ou a expiré.

**Solution :**
1. Allez sur [web3forms.com](https://web3forms.com)
2. Vérifiez que votre clé API est toujours active
3. Si nécessaire, créez une nouvelle clé API
4. Mettez à jour la variable d'environnement avec la nouvelle clé
5. Redéployez

### Erreur : "Failed to fetch" ou erreur réseau

**Causes possibles :**
- Problème de connexion internet
- Blocage par un pare-feu ou un bloqueur de publicité
- Problème avec l'API Web3Forms (temporaire)

**Solution :**
- Vérifiez votre connexion internet
- Désactivez temporairement les bloqueurs de publicité
- Réessayez dans quelques minutes

### Je ne reçois pas d'emails

**Vérifications :**
1. ✅ Vérifiez votre dossier spam/courrier indésirable
2. ✅ Vérifiez l'adresse email sur votre compte Web3Forms
3. ✅ Vérifiez que la clé API est correcte
4. ✅ Vérifiez les logs dans la console du navigateur
5. ✅ Vérifiez votre quota sur Web3Forms (250 emails/mois gratuit)

## 📋 Checklist de Vérification

Avant de tester le formulaire, vérifiez :

**En développement local :**
- [ ] Le fichier `.env` existe à la racine du projet
- [ ] Le fichier `.env` contient `VITE_WEB3FORMS_ACCESS_KEY=votre-clé`
- [ ] Le serveur de développement a été redémarré après avoir ajouté la variable
- [ ] La console du navigateur ne montre pas d'erreurs

**En production (Vercel) :**
- [ ] Variable `VITE_WEB3FORMS_ACCESS_KEY` ajoutée sur Vercel
- [ ] Les 3 environnements sont cochés (Production, Preview, Development)
- [ ] La valeur de la clé est correcte
- [ ] L'application a été **redéployée** après avoir ajouté la variable
- [ ] Le déploiement est terminé et en statut "Ready"

## 🧪 Tester le Formulaire

1. **Ouvrez la console du navigateur** (F12)
2. **Allez sur la page Contact** de votre site
3. **Remplissez le formulaire** avec des données de test
4. **Soumettez le formulaire**
5. **Regardez la console** pour voir les messages :
   - Si vous voyez `Response status: 200` et `success: true` → ✅ Ça fonctionne !
   - Si vous voyez une erreur → Lisez le message pour comprendre le problème

## 💡 Conseils

1. **Toujours vérifier la console du navigateur en premier** - C'est là que vous verrez les erreurs détaillées
2. **Vérifiez votre dossier spam** - Les emails peuvent parfois y arriver
3. **Redéployez après avoir changé les variables** - Vercel ne les applique pas automatiquement
4. **Utilisez des données de test** - Ne testez pas avec de vraies données importantes

## 📞 Besoin d'aide ?

Si après avoir suivi ces étapes ça ne fonctionne toujours pas :
1. Vérifiez la console du navigateur (F12) pour voir les erreurs détaillées
2. Vérifiez les logs de déploiement sur Vercel
3. Assurez-vous que la clé API Web3Forms est toujours active sur [web3forms.com](https://web3forms.com)
4. Consultez la documentation Web3Forms : [web3forms.com/docs](https://web3forms.com/docs)
