#!/bin/bash

# 🔄 Data Migration Script: SQLite → PostgreSQL (Neon)
# This script migrates all data from local SQLite to production PostgreSQL

echo "================================================================"
echo "🔄 DATA MIGRATION: SQLite → PostgreSQL (Neon)"
echo "================================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Backup current .env
echo -e "${BLUE}📦 Step 1: Backing up current .env...${NC}"
cp .env .env.backup
echo -e "${GREEN}✅ Backup created: .env.backup${NC}"
echo ""

# Step 2: Switch to SQLite temporarily
echo -e "${BLUE}📝 Step 2: Switching to SQLite database...${NC}"
export DATABASE_URL="file:./dev.db"
echo "DATABASE_URL=file:./dev.db" > .env.temp
cat .env | grep -v DATABASE_URL >> .env.temp
mv .env.temp .env
echo -e "${GREEN}✅ Switched to SQLite${NC}"
echo ""

# Step 3: Export data using Prisma
echo -e "${BLUE}📤 Step 3: Exporting data from SQLite...${NC}"
npx prisma studio &
STUDIO_PID=$!
echo "Prisma Studio opened (PID: $STUDIO_PID)"
echo -e "${YELLOW}Please export your data manually from Prisma Studio, or press Ctrl+C to continue${NC}"
sleep 5
kill $STUDIO_PID 2>/dev/null

echo ""
echo -e "${BLUE}📥 Step 4: Restoring PostgreSQL connection...${NC}"
mv .env.backup .env
echo -e "${GREEN}✅ PostgreSQL connection restored${NC}"
echo ""

echo "================================================================"
echo -e "${YELLOW}⚠️  Manual Step Required${NC}"
echo "================================================================"
echo ""
echo "Unfortunately, automatic migration is complex due to schema differences."
echo "Please input your data manually in the admin panel:"
echo ""
echo "1. Open: http://localhost:3000/login"
echo "2. Login with: adewidodo@hse.com / hse123456"
echo "3. Re-enter your content in each section"
echo ""
echo "OR, if you have SQL knowledge, you can:"
echo "1. Export SQLite data: sqlite3 prisma/dev.db .dump > backup.sql"
echo "2. Convert to PostgreSQL format"
echo "3. Import to Neon"
echo ""
echo -e "${RED}Sorry for the inconvenience!${NC}"
