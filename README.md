# Suphachai Chaichang Portfolio

Production portfolio website for Suphachai Chaichang, built as a static HTML/CSS/JavaScript site and prepared for GitHub Pages.

## Pages

- `index.html`
- `project-my-success-story.html`
- `project-my-success-maker.html`
- `project-ace-student.html`
- `project-ace-teacher.html`
- `project-linda-exchange.html`
- `project-business-management-erp-system.html`

## Features

- Responsive portfolio homepage with Hero, About, Skill, Certificates, Projects, and CTA sections
- Project detail case studies
- Thai and English language switcher with saved language preference
- Certificate preview modal
- Reduced-motion support
- GitHub Pages-ready static deployment

## Local Preview

Open `index.html` directly in a browser, or serve the folder with any static server.

## Deployment

This repo is prepared for GitHub Pages from the `main` branch root.

```bash
git init
git branch -M main
git add .
git commit -m "Prepare portfolio for GitHub Pages"
git remote add origin https://github.com/<username>/portfolio-suphachai-chaichang.git
git push -u origin main
```

Then enable GitHub Pages in the repository settings:

1. Go to Settings > Pages.
2. Source: Deploy from a branch.
3. Branch: `main`, folder: `/root`.
4. Save and open the generated GitHub Pages URL.
