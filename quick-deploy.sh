#!/bin/bash

# Script untuk quick deploy ke production
# Usage: ./quick-deploy.sh "commit message"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 QUICK DEPLOY TO PRODUCTION${NC}"
echo "======================================"
echo ""

# Get commit message from argument or use default
if [ -z "$1" ]; then
    COMMIT_MSG="Update: $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "${YELLOW}⚠️  No commit message provided. Using default:${NC}"
    echo "   $COMMIT_MSG"
else
    COMMIT_MSG="$1"
fi

echo ""
echo -e "${BLUE}📊 Git Status:${NC}"
git status --short

echo ""
read -p "Continue with deployment? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Deployment cancelled."
    exit 1
fi

echo ""
echo -e "${BLUE}📦 Staging changes...${NC}"
git add .

echo ""
echo -e "${BLUE}💾 Committing...${NC}"
git commit -m "$COMMIT_MSG"

echo ""
echo -e "${BLUE}🔼 Pushing to GitHub...${NC}"
git push origin main

echo ""
echo -e "${GREEN}✅ DONE!${NC}"
echo ""
echo "Vercel will automatically deploy your changes."
echo "Monitor deployment: https://vercel.com/el-mawans-projects/portfolio-adewidodo"
echo ""
echo "Expected deployment time: 1-2 minutes"
echo ""
echo -e "${GREEN}Production URL:${NC} https://portfolio-adewidodo.vercel.app/"
echo ""
