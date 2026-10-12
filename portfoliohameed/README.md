# Sayed Hameed Peerzade — Personal Technology & Startup Website

> **Premium Startup-Style Personal Technology Website**  
> *Electronics & Communication Engineering Student at AITM Bhatkal | Innovator | Researcher | Entrepreneur*

---

## 🚀 Overview

This website represents the personal technology brand, R&D laboratory, and project showcase for **Sayed Hameed Peerzade**. Built with a high-end futuristic aesthetic, cinematic loading sequence, 3D WebGL visuals, and modular architecture, it presents Sayed not just as a student, but as a technology founder building real solutions.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Visuals**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Directory Architecture

```
├── public/
│   ├── profile/      # Profile photograph (sayed-hameed.jpg)
│   ├── projects/     # Project showcase images
│   ├── gallery/      # R&D and workshop gallery photos
├── src/
│   ├── app/          # Next.js App Router (layout.tsx, page.tsx, globals.css)
│   ├── components/   # Modular UI components (15 sections + 3D scenes)
│   ├── data/         # Structured TypeScript data files
│   └── lib/          # Utilities (cn helper, formatting)
```

---

## ⚙️ Development & Build Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📝 How to Customize Content & Data

All content is decoupled from UI components and stored inside `src/data/`:

### 1. How to Change Profile Photo
1. Place your photograph in `public/profile/sayed-hameed.jpg`.
2. The site automatically detects and presents the photo with an animated glow frame and fallback card.

### 2. How to Add or Edit Projects
Edit `src/data/projects.ts`:
```ts
{
  id: "your-project-id",
  title: "Project Name",
  category: "AI • ROBOTICS",
  tagline: "Short pitch sentence.",
  description: "Brief summary.",
  fullDescription: "Detailed technical explanation.",
  status: "BUILDING", // BUILDING | PROJECT | RESEARCH IN PROGRESS | COMPLETED
  technologies: ["Node.js", "Sensors", "AI"],
  image: "/projects/your-image.jpg",
  githubUrl: "https://github.com/...",
  demoUrl: "https://...",
  featured: true,
}
```

### 3. How to Update Social Links
Edit `src/data/socials.ts` and set your URLs and availability flag:
```ts
{
  platform: "LinkedIn",
  label: "LinkedIn Profile",
  url: "https://linkedin.com/in/yourprofile",
  iconName: "Linkedin",
  isAvailable: true,
}
```

### 4. How to Add Gallery Images
Place images in `public/gallery/` and add entries to `src/data/gallery.ts`.

---

## ☁️ Deploying to Vercel

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the repository into your [Vercel Dashboard](https://vercel.com).
3. Vercel automatically detects Next.js build settings (`npm run build`).
4. Click **Deploy**.

---

## ⚡ License & Credits

Designed & Engineered for **Sayed Hameed Peerzade**.  
*Innovation • Engineering • Technology*
