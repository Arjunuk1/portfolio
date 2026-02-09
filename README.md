# 🚀 Arjun Sharma - Developer Portfolio

This is my personal portfolio website built to showcase my projects, technical skills, achievements, and development journey.

The website is fully responsive and deployed on Vercel, making it accessible across all devices.

🌐 Live Website: https://portfolio-arjunuk1.vercel.app/

---

## ✨ Features

- 👤 About Me section
- 🏆 Achievements & Academic Journey
- 💻 Project Showcase
- 📱 Fully Responsive Design
- ⚡ Fast Deployment via Vercel
- 🎨 Modern UI with clean layout

---

## 🛠 Tech Stack

- HTML
- CSS
- JavaScript / TypeScript
- React
- Vite
- Node.js (Project setup)
- Vercel (Deployment)

---

## ⚙️ Setup & Configuration

### GitHub API Configuration (Recommended)

The portfolio fetches projects from GitHub. To avoid API rate limits:

1. **Create a GitHub Personal Access Token:**
   - Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a name (e.g., "Portfolio Website")
   - No special scopes are needed for public repositories
   - Generate and copy the token

2. **Add the token to your project:**
   - Create a `.env` file in the project root (use `.env.example` as template)
   - Add: `VITE_GITHUB_TOKEN=your_github_token_here`

3. **Benefits:**
   - **Without token:** 60 API requests/hour (easily exceeded)
   - **With token:** 5,000 API requests/hour
   - **Caching:** Projects are cached for 1 hour to reduce API calls

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🎯 Purpose

This portfolio represents my growth as a developer and serves as a central platform to present my technical work, academic projects, and practical implementations.

It reflects my understanding of frontend development, project structuring, and modern deployment workflows.

---

## 📌 Future Improvements

- Enhanced animations and UI refinements
- ~~Backend integration for dynamic project fetching~~ ✅ Done (GitHub API with caching)
- Performance optimization
- SEO enhancements
- Blog section for technical articles

---

## 👨‍💻 Author

Arjun Sharma  
BE CSE Student  
Passionate about Backend Development, Problem Solving, and Building Real-World Applications.
