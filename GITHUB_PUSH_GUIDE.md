# GitHub Setup & Push Guide for Food Management System

## ✅ Pre-Push Checklist

Before pushing to GitHub, make sure:

- [x] `.env` file is in `.gitignore` (sensitive data protected)
- [x] `.env.example` exists (shows required variables)
- [x] `node_modules/` is in `.gitignore`
- [x] `package-lock.json` is in `.gitignore`
- [x] No passwords or API keys in any committed files
- [x] `README.md` is present and up-to-date
- [x] `FOOD_MANAGEMENT_SYSTEM_SRS.md` is added

---

## Step-by-Step GitHub Push Instructions

### Step 1: Initialize Git (if not already done)

```bash
cd d:\3-1\sdc\project3-1
git init
```

### Step 2: Check Git Status

```bash
git status
```

**What you should see:**
- ✅ `.env` is NOT shown (ignored)
- ✅ `node_modules/` is NOT shown (ignored)
- ✅ Only project files are shown (`.gitignore`, README, source code, etc.)

If `.env` appears in the list, run:
```bash
git rm --cached .env
```

### Step 3: Add All Files to Staging

```bash
git add .
```

### Step 4: Verify What's Being Added

```bash
git status
```

You should see something like:
```
new file:   .gitignore
new file:   .env.example
new file:   README.md
new file:   package.json
new file:   server.js
new file:   models/
new file:   routes/
...
```

**IMPORTANT:** `.env` should NOT appear in this list!

### Step 5: Create First Commit

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"

git commit -m "Initial commit: Food Donation Management System with SRS documentation"
```

---

## Creating GitHub Repository

### Option A: Using GitHub Web Interface

1. Go to **https://github.com/new**
2. **Repository name:** `food-management-system` (or your preferred name)
3. **Description:** "A web-based food donation management system connecting food donors with receivers"
4. **Public** or **Private** (your choice)
5. **DO NOT** initialize with README (we already have one)
6. **DO NOT** add .gitignore or license (we already have them)
7. Click **Create repository**

### Option B: Using GitHub CLI

```bash
gh repo create food-management-system --public --source=. --remote=origin --push
```

---

## Step 6: Add Remote Repository

After creating the repository on GitHub, you'll see instructions. Run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/food-management-system.git
```

Replace `YOUR_USERNAME` with your GitHub username.

### Verify Remote

```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/food-management-system.git (fetch)
origin  https://github.com/YOUR_USERNAME/food-management-system.git (push)
```

---

## Step 7: Push to GitHub

### For New Repository (First Time)

```bash
git branch -M main
git push -u origin main
```

### For Subsequent Pushes

```bash
git push origin main
```

---

## Step 8: Verify on GitHub

1. Go to **https://github.com/YOUR_USERNAME/food-management-system**
2. You should see all your files
3. Verify `.env` is NOT present (only `.env.example` should be there)
4. Check that README is displayed

---

## ⚠️ SECURITY CHECKLIST

Before pushing, NEVER commit:

❌ `.env` file (contains database URI, session secret)
❌ `node_modules/` (huge directory, users install via `npm install`)
❌ Personal API keys or credentials
❌ Database connection strings with passwords
❌ Session secrets or encryption keys
❌ Email passwords or authentication tokens

---

## Common Issues & Solutions

### Issue: ".env file already committed"

If you accidentally committed `.env` before adding to `.gitignore`:

```bash
git rm --cached .env
git add .gitignore
git commit -m "Remove .env from version control"
git push origin main
```

### Issue: "Authentication failed"

Make sure you have:

**Option 1: SSH Keys (Recommended)**
```bash
ssh -T git@github.com
```

**Option 2: Personal Access Token (Alternative)**
```bash
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/food-management-system.git
```

### Issue: "Permission denied"

On Windows PowerShell:
```bash
git config --global core.safecrlf false
```

---

## After First Push: Ongoing Workflow

### For each update:

```bash
# 1. Check what changed
git status

# 2. Stage changes
git add .

# 3. Commit with meaningful message
git commit -m "Add feature: xyz" -m "Detailed description of changes"

# 4. Push to GitHub
git push origin main
```

---

## Good Commit Message Examples

✅ Good:
- "Add SRS documentation for project"
- "Fix login authentication bug"
- "Add password reset functionality"
- "Update README with installation steps"

❌ Bad:
- "update"
- "fixes"
- "asdf"
- "final final final"

---

## Branches (Optional)

For larger features, use branches:

```bash
# Create and switch to new branch
git checkout -b feature/add-notifications

# Make changes and commit
git add .
git commit -m "Add email notification system"

# Push branch to GitHub
git push origin feature/add-notifications

# On GitHub: Create Pull Request (PR)
# After review: Merge to main
# Delete branch
git branch -d feature/add-notifications
```

---

## Useful Git Commands

```bash
# View commit history
git log

# View changes since last commit
git diff

# Undo uncommitted changes
git checkout -- filename

# Amend last commit (before push)
git commit --amend -m "New message"

# See all branches
git branch -a

# Clone (download) repository
git clone https://github.com/YOUR_USERNAME/food-management-system.git
```

---

## Final Verification

After pushing, verify on GitHub that:

✅ All source code files are visible
✅ `.env` is NOT present
✅ `.env.example` IS present
✅ `README.md` displays correctly
✅ `FOOD_MANAGEMENT_SYSTEM_SRS.md` is in the repo
✅ `package.json` with dependencies is visible
✅ Documentation files are readable

---

## What Happens After Deployment

When someone clones your repo:

```bash
git clone https://github.com/YOUR_USERNAME/food-management-system.git
cd food-management-system
npm install
cp .env.example .env
# They edit .env with their own credentials
npm start
```

They'll know to create `.env` from `.env.example` because of documentation!

---

**Your repository is now ready for GitHub! 🚀**

