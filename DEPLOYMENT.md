# Deployment Guide

## ✅ GitHub Setup - COMPLETED

Your code has been successfully pushed to: https://github.com/tallkarol/karolbuczek-site.git

## Vercel Deployment

### Step-by-Step Instructions:

1. **Sign in to Vercel**: Go to https://vercel.com/login and sign in with your GitHub account

2. **Import Repository**: 
   - Click "Add New Project" or go to https://vercel.com/new
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub repositories if prompted
   - Find and select `tallkarol/karolbuczek-site` from the list

3. **Configure Project**:
   - Vercel will auto-detect Next.js settings (no changes needed)
   - Project Name: `karolbuczek-site` (or your preferred name)
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables** (IMPORTANT):
   Click "Environment Variables" and add:
   - **Name**: `RESEND_API_KEY`
     **Value**: Your Resend API key (get it from https://resend.com/api-keys)
   - **Name**: `CONTACT_EMAIL` (optional)
     **Value**: Email to receive contact form submissions (defaults to karol@karolbuczek.com if not set)

5. **Deploy**: Click "Deploy" button

6. **Wait for Deployment**: Vercel will build and deploy your site (usually takes 1-2 minutes)

7. **Get Your URL**: Once deployed, you'll get a URL like `https://karolbuczek-site.vercel.app`

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts and add environment variables when asked.

## Environment Variables Required

- `RESEND_API_KEY` - Required for contact form functionality
- `CONTACT_EMAIL` - Optional, defaults to karol@karolbuczek.com

## Post-Deployment

After deployment, Vercel will provide you with:
- Production URL (e.g., `https://karolbuczek.vercel.app`)
- Automatic deployments on every push to main branch
- Preview deployments for pull requests

You can also add a custom domain in Vercel settings if you have one.

