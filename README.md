# 🔮 Reverse Akinator AI

> Turn the tables on Akinator! The AI secretly picks a character, and you have 20 Yes/No questions to deduce who it is.

[![100% Free](https://img.shields.io/badge/Cost-100%25%20Free-brightgreen)](#)
[![Zero Backend](https://img.shields.io/badge/Backend-None%20(Single%20Page)-blue)](#)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 🎮 How to Play

1. **Pick a Universe**: Choose from 10 categories (Anime, Marvel & DC, Gaming, Movies & TV, Tech Pioneers, Scientists, Historical Leaders, Sports Legends, Pop Music) or type a **Custom Topic** of your choice.
2. **20 Questions Limit**: Ask up to 20 Yes/No questions (e.g. *"Is this character fictional?"*, *"Are they alive today?"*, *"Do they have superpowers?"*).
3. **Direct Guess Anytime**: Think you know who it is? Click **Direct Guess** to submit their name. If you are right, you win immediately with confetti!
4. **"I Quit" (Surrender)**: If you get stuck, click **I Quit** to reveal the secret identity, biography, and trivia.
5. **The 3 Final Guesses**: If you use all 20 questions without guessing, you enter **Climax Mode** with 3 final chances to name the character before the AI claims victory.

---

## 🚀 One-Click Free Deployment

This project requires **NO backend servers**, **NO databases**, and **NO paid API keys**. It runs 100% client-side.

### Option A: Deploy to Vercel (Recommended)
1. Push this repository to GitHub or drag the folder to [Vercel](https://vercel.com/).
2. Vercel automatically detects the `vercel.json` and Vite build configuration.
3. Click **Deploy**. Your game is live in seconds for $0!

### Option B: Deploy to GitHub Pages
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment**, select **GitHub Actions** and pick the static/Vite workflow.
3. Your site will be hosted for free at `https://<username>.github.io/<repo>/`.

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Build production bundle (outputs to /dist)
npm run build
```

---

## 🌟 Key Features
- **100% Free**: Zero subscription fees, zero paid APIs.
- **Client-side Wikipedia Search**: Live attribute extraction and fact-checking using free public Wikipedia endpoints.
- **Synthesized Web Audio**: Retro-cyber procedural sound effects generated natively in the browser with no external audio file dependencies.
- **Rich Cyber-genie Theme**: Glowing animations, glassmorphism, responsive mobile/desktop HUD, dynamic mascot moods.
