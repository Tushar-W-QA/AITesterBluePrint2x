# ⚡ AIBuddy: Vercel Deployment Instructions

The project has been consolidated into a unified, full-stack structure ready for Vercel deployment. Both the React frontend and the Express backend (now as a Serverless Function) are merged into the root.

## 🚀 How to Deploy (Step-by-Step)

Since you don't have the Vercel CLI, follow these steps to deploy manually:

### 1. Push to GitHub
1. Create a **new repository** on your GitHub account.
2. Push the contents of the `Project04_AI_Agent` folder to that repository.
   - *If you need help with Git, let me know!*

### 2. Connect to Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** > **"Project"**.
3. Import the GitHub repository you just created.

### 3. Configure Framework
1. Vercel should automatically detect **Vite**.
2. **Root Directory:** Ensure it is set to `./` (the root where `index.html` and `api/` are located).
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`

### 4. Deploy!
1. Click **Deploy**.
2. Once the build is finished, your site will be live!

---

## ⚠️ Important for Free Tier Users
- **10s Timeout:** On the Vercel Free tier, the backend will timeout after **10 seconds**. If a test plan takes longer to generate, the request will fail.
- **Recommendations:** Use fast models (like `llama-3.1-8b-instant` on Groq) to stay within the limit.

## 🛠️ Local Development
To run locally now:
1. Run `npm install` in the root.
2. Start the backend: `node api/index.js` (you may need to add `app.listen` back for true local testing, or use `vercel dev`).
3. Start the frontend: `npm run dev`.
