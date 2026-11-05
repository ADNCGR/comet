# Configuration Web3Forms

Le formulaire de contact utilise maintenant Web3Forms pour envoyer les emails directement à votre adresse email.

## 📧 Obtenir votre clé API Web3Forms

1. Allez sur [web3forms.com](https://web3forms.com)
2. Cliquez sur **"Get Your Access Key"** ou **"Sign Up"**
3. Entrez votre adresse email
4. Vous recevrez votre clé d'accès par email
5. Copiez la clé (elle ressemble à : `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

## 🔧 Configuration

### En développement local

1. Créez un fichier `.env` à la racine du projet (s'il n'existe pas déjà)
2. Ajoutez votre clé API :

```env
VITE_WEB3FORMS_ACCESS_KEY=votre-clé-api-ici
```

### Sur Vercel (Production)

1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez une nouvelle variable :
   - **Name**: `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value**: votre clé API Web3Forms
5. Sélectionnez tous les environnements (Production, Preview, Development)
6. Cliquez sur **Save**
7. **Redéployez** votre application pour appliquer les changements

## ✅ Tester

1. Remplissez le formulaire de contact sur votre site
2. Soumettez-le
3. Vous devriez recevoir un email à l'adresse que vous avez configurée sur Web3Forms

## 📝 Format des emails

Vous recevrez des emails avec :
- **Sujet**: "Nouvelle demande de devis - [Nom de l'entreprise]" ou "Nouvelle demande de démonstration - [Nom de l'entreprise]"
- **Contenu**: Toutes les informations du formulaire formatées de manière lisible
- **Expéditeur**: L'email de la personne qui a rempli le formulaire

## 🔒 Sécurité

- Ne partagez jamais votre clé API publiquement
- Ne commitez pas le fichier `.env` dans Git (il est déjà dans `.gitignore`)
- La clé API est utilisée côté client, mais Web3Forms a des protections contre les abus

## 💡 Avantages de Web3Forms

- ✅ Pas besoin de backend
- ✅ Pas besoin de base de données
- ✅ Emails reçus directement dans votre boîte mail
- ✅ Gratuit jusqu'à 250 soumissions/mois
- ✅ Protection anti-spam intégrée
- ✅ Simple à configurer

## 🆘 Problèmes courants

**Je ne reçois pas d'emails :**
- Vérifiez que la clé API est correctement configurée
- Vérifiez votre dossier spam
- Vérifiez l'adresse email configurée sur Web3Forms
- Consultez les logs dans la console du navigateur (F12)

**Erreur "Invalid access key" :**
- Vérifiez que la clé API est correcte
- Assurez-vous qu'elle est bien définie dans les variables d'environnement
- Redéployez après avoir ajouté la variable

