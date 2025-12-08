#!/bin/bash

# GitHub Repository Setup Script
# Run this after creating your GitHub repository

echo "GitHub Repository Setup"
echo "======================"
echo ""
echo "Please provide your GitHub username:"
read -r GITHUB_USERNAME

echo ""
echo "Repository name (default: karolbuczek):"
read -r REPO_NAME
REPO_NAME=${REPO_NAME:-karolbuczek}

echo ""
echo "Setting up remote and pushing to GitHub..."
echo ""

# Add remote
git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git" 2>/dev/null || git remote set-url origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# Ensure we're on main branch
git branch -M main

# Push to GitHub
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Import your repository: ${GITHUB_USERNAME}/${REPO_NAME}"
echo "4. Add environment variables:"
echo "   - RESEND_API_KEY"
echo "   - CONTACT_EMAIL (optional)"
echo "5. Deploy!"


