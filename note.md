# Node + TypeScript + PostgreSQL Project Setup

This checklist summarizes the initial setup we used for the **car-showroom** project.

## 1. Open WSL

From PowerShell:

```powershell
wsl
```

Move to your Linux home directory:

```bash
cd ~
```

Create a projects folder if it does not already exist:

```bash
mkdir projects
```

Enter it:

```bash
cd projects
```

## 2. Create the Project

Create the project folder:

```bash
mkdir car-showroom
```

Enter it:

```bash
cd car-showroom
```

Open it in VS Code:

```bash
code .
```

Recommended location:

```text
/home/<your-linux-user>/projects/car-showroom
```

Prefer this over storing Node projects under `/mnt/c/...`.

## 3. Initialize Git

```bash
git init
```

Rename the default branch to `main`:

```bash
git branch -M main
```

Check the repository:

```bash
git status
```

## 4. Initialize Node.js

```bash
npm init -y
```

This creates:

```text
package.json
```

## 5. Create `.gitignore`

Create:

```text
.gitignore
```

Add:

```text
node_modules/
.env
dist/
```

Why:

- `node_modules/` can be recreated with `npm install`
- `.env` may contain passwords, API keys, and secrets
- `dist/` contains generated build output

## 6. Install Runtime Dependencies

```bash
npm install express cors dotenv pg
```

Packages:

- `express` — web server / API framework
- `cors` — controls cross-origin requests
- `dotenv` — loads environment variables from `.env`
- `pg` — PostgreSQL client for Node.js

## 7. Install TypeScript Development Dependencies

```bash
npm install -D typescript tsx @types/node @types/express @types/cors @types/pg
```

Packages:

- `typescript` — TypeScript compiler and type checking
- `tsx` — runs TypeScript directly and supports watch mode
- `@types/node` — Node.js type definitions
- `@types/express` — Express type definitions
- `@types/cors` — CORS type definitions
- `@types/pg` — PostgreSQL client type definitions

`-D` means the packages are saved under `devDependencies`.

## 8. Initialize TypeScript

```bash
npx tsc --init
```

This creates:

```text
tsconfig.json
```

## 9. Create the Initial Backend Structure

Recommended starting structure:

```text
car-showroom/
├── src/
│   ├── server.ts
│   ├── config/
│   │   └── database.ts
│   └── modules/
│       ├── brands/
│       └── cars/
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

Example commands:

```bash
mkdir -p src/config
mkdir -p src/modules/brands
mkdir -p src/modules/cars
touch src/server.ts
touch src/config/database.ts
```

## 10. Development Script

Later, once `src/server.ts` exists, add a script to `package.json`:

```json
"scripts": {
  "dev": "tsx watch src/server.ts"
}
```

Then run the backend with:

```bash
npm run dev
```

`tsx watch` runs the TypeScript server and automatically restarts it when files change.

## 11. Useful Git Commands

Check changes:

```bash
git status
```

Review changes:

```bash
git diff
```

Stage changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "chore: initialize backend project"
```

View compact commit history:

```bash
git log --oneline
```

## 12. GitHub with SSH

SSH was configured once in WSL, so future repositories can use SSH directly.

Typical remote:

```bash
git remote add origin git@github.com:YOUR_USERNAME/car-showroom.git
```

Push the first commit:

```bash
git push -u origin main
```

After that:

```bash
git push
```

is usually enough.

You do **not** need to create a new SSH key for every project on the same WSL environment.

## Quick Reusable Setup

```bash
cd ~/projects
mkdir my-project
cd my-project

git init
git branch -M main

npm init -y

npm install express cors dotenv pg
npm install -D typescript tsx @types/node @types/express @types/cors @types/pg

npx tsc --init

mkdir -p src/config
mkdir -p src/modules
touch src/server.ts
touch src/config/database.ts
```

Then create `.gitignore` with:

```text
node_modules/
.env
dist/
```

## Recommended Development Environment

```text
Windows
├── Browser
├── Postman
└── VS Code interface

WSL / Ubuntu
├── Project files
├── Node.js
├── npm
├── Git
└── PostgreSQL
```

Keeping the backend and database inside WSL avoids unnecessary Windows-to-WSL networking problems.
