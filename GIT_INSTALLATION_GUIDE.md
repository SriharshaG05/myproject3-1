# Git Installation & GitHub Push Guide

## Step 1: Install Git on Windows

### Option A: Download from official website (Recommended)

1. Go to **https://git-scm.com/download/win**
2. Download the latest installer (usually `Git-2.x.x-64-bit.exe`)
3. Run the installer and follow these settings:
   - **Select Components:** Keep all defaults checked
   - **Default Editor:** Choose "Use Visual Studio Code as Git's default editor" (or Notepad)
   - **Initial branch name:** `main`
   - **PATH Environment:** Select "Git from the command line and also from 3rd-party software"
   - **HTTPS transport backend:** Use the native Windows Secure Channel library
   - **Line ending conversions:** Checkout as-is, commit as-is
   - **Terminal emulator:** Use Windows' default console window
   - **Git Pull behavior:** Default (fast-forward or merge)
   - **Credential manager:** Select "Git Credential Manager"
   - Click **Install** and wait for completion

### Option B: Using Windows Package Manager (WinGet)

```powershell
winget install --id Git.Git -e --source winget
```

### Option C: Using Chocolatey

```powershell
choco install git
```

---

## Step 2: Verify Git Installation

After installation, **close and reopen PowerShell**, then run:

```powershell
git --version
```

You should see something like:
```
git version 2.42.0.windows.1
```

---

## Step 3: Configure Git with Your GitHub Credentials

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@github.com"
```

Replace with your actual GitHub username and email.

**Verify configuration:**
```powershell
git config --global --list
```

---

## Step 4: Create a Repository on GitHub

1. Go to **https://github.com/new**
2. Enter these details:
   - **Repository name:** `food-management-system`
   - **Description:** "A web-based food donation management system connecting food donors with receivers"
   - **Visibility:** `Public` (or Private if you prefer)
   - **DO NOT** check "Add a README file"
   - **DO NOT** add .gitignore (we already have one)
   - **DO NOT** choose a license yet
3. Click **Create repository**

---

## Step 5: Initialize Git in Your Project

Navigate to your project folder and initialize git:

```powershell
cd d:\3-1\sdc\project3-1
git init
```

---

## Step 6: Check Git Status

```powershell
git status
```

**You should see:**
- `.env` should NOT appear (it's in .gitignore - ✅ Good!)
- `node_modules/` should NOT appear (✅ Good!)
- Other files should appear as untracked

---

## Step 7: Add All Files

```powershell
git add .
```

---

## Step 8: Create First Commit

```powershell
git commit -m "Initial commit: Food Donation Management System with SRS documentation"
```

---

## Step 9: Add Remote GitHub Repository

After creating the repo on GitHub, you'll see a URL like:
`https://github.com/SriharshaG05/food-management-system.git`

Add it as remote:

```powershell
git remote add origin https://github.com/SriharshaG05/food-management-system.git
```

**Verify:**
```powershell
git remote -v
```

---

## Step 10: Set Main Branch

```powershell
git branch -M main
```

---

## Step 11: Push to GitHub

**First push (with tracking):**
```powershell
git push -u origin main
```

**GitHub will prompt for authentication:**
- **Username:** Your GitHub username (SriharshaG05)
- **Password:** Use a **Personal Access Token** (NOT your GitHub password)

### How to Create a Personal Access Token:

1. Go to GitHub: **Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name: "Git Push Token"
4. Select scopes: Check `repo` (for repository access)
5. Click **Generate token** and **copy the token** immediately
6. Use this token as your password when Git prompts

---

## Step 12: Verify on GitHub

1. Go to **https://github.com/SriharshaG05/food-management-system**
2. Verify:
   - ✅ All files are visible
   - ✅ `.env` is NOT present
   - ✅ `.env.example` IS present
   - ✅ README and SRS documents are there

---

## Complete Step-by-Step Commands

Run these commands in order in PowerShell:

```powershell
# Install Git (if not already done)
# Download from https://git-scm.com/download/win

# Navigate to project
cd d:\3-1\sdc\project3-1

# Initialize git
git init

# Configure git (do this once)
git config --global user.name "SriharshaG05"
git config --global user.email "your.email@gmail.com"

# Check status
git status

# Stage all files
git add .

# Create commit
git commit -m "Initial commit: Food Donation Management System with SRS documentation"

# Add remote (replace URL if different)
git remote add origin https://github.com/SriharshaG05/food-management-system.git

# Set main branch
git branch -M main

# Push to GitHub (you'll be prompted for token/password)
git push -u origin main
```

---

## Troubleshooting

### Error: "fatal: not a git repository"
**Solution:** Run `git init` first

### Error: "fatal: destination path already exists"
**Solution:** Already initialized. Just run the other commands.

### Error: "Authentication failed"
**Solution:** 
- Make sure you're using a Personal Access Token (not your password)
- Or set up SSH keys (advanced option)

### Error: ".env accidentally committed"
**Solution:**
```powershell
git rm --cached .env
git add .gitignore
git commit -m "Remove .env from git tracking"
git push origin main
```

---

## Future Pushes (After Initial Setup)

After the first push, for any future updates:

```powershell
cd d:\3-1\sdc\project3-1
git add .
git commit -m "Your commit message describing changes"
git push origin main
```

---

## Security Reminders ⚠️

**NEVER commit:**
- ❌ `.env` (database credentials, API keys)
- ❌ `node_modules/` (too large)
- ❌ API keys or tokens
- ❌ Database passwords
- ❌ Session secrets

**Always:**
- ✅ Use `.gitignore` to exclude sensitive files
- ✅ Use `.env.example` to show what variables are needed
- ✅ Use Personal Access Tokens (not passwords)
- ✅ Review what you're committing with `git status`

---

**You're now ready to push your project to GitHub! 🚀**

