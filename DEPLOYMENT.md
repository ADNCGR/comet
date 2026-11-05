# Deployment Guide - Vercel

## Prerequisites

1. **Web3Forms Account** - Get your free API key from [web3forms.com](https://web3forms.com)
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)

## Step 1: Get Web3Forms API Key

1. Go to [web3forms.com](https://web3forms.com)
2. Click "Get Your Access Key"
3. Enter your email address
4. Copy the access key you receive (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variables in Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add:
     - `VITE_WEB3FORMS_ACCESS_KEY` = your Web3Forms access key

5. Redeploy to apply environment variables:
   ```bash
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite
6. Add environment variables:
   - `VITE_WEB3FORMS_ACCESS_KEY` = your Web3Forms access key
7. Click "Deploy"

## Step 3: Verify Form Submission

After deployment, test the form submission:
1. Go to your website's contact page
2. Fill out and submit the form
3. Check your email inbox (the email you used to register with Web3Forms)
4. You should receive the form submission as an email

## Environment Variables Required

### Frontend (Vercel)
- `VITE_WEB3FORMS_ACCESS_KEY` - Your Web3Forms API access key

## How to View Form Submissions

Form submissions are sent directly to your email address (the one you registered with Web3Forms). You don't need a database - all submissions come to your inbox!

## Contact Form Setup

The contact form uses **Web3Forms** for email delivery:
- ✅ No backend required
- ✅ No database needed
- ✅ Emails sent directly to your inbox
- ✅ Free up to 250 submissions/month
- ✅ Simple setup with just one API key

## Troubleshooting

- **Form not submitting?** 
  - Check browser console (F12) for error messages
  - Verify `VITE_WEB3FORMS_ACCESS_KEY` is set in Vercel
  - Make sure you redeployed after adding the environment variable
  
- **"Clé API Web3Forms non configurée" error?**
  - The environment variable is missing or not loaded
  - Add `VITE_WEB3FORMS_ACCESS_KEY` in Vercel Settings → Environment Variables
  - **Important:** Redeploy after adding the variable!
  
- **Not receiving emails?**
  - Check your spam folder
  - Verify the email address on your Web3Forms account
  - Check Web3Forms dashboard for submission logs
  
- **Environment variables not working?** 
  - Make sure to redeploy after adding them
  - Variables starting with `VITE_` are required for Vite apps
  - Check that all environments (Production, Preview, Development) are selected

See `VERCEL_SETUP.md` for detailed Vercel configuration instructions.

