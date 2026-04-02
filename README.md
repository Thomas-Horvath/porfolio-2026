# Thomas Horvath Portfolio

A modern personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

This project presents my work, skills, and contact information in a clean and responsive way. It includes multilingual content, project detail pages, subtle motion effects, and a custom loading experience.

## Live Purpose

This website is made to:

- show selected frontend and full-stack projects
- introduce my background and technical skills
- give visitors a simple way to contact me
- present my work in Hungarian and English

## Main Features

- Responsive portfolio layout for desktop, tablet, and mobile
- Project listing page with filters
- Dynamic project detail pages
- English and Hungarian language support
- Custom not-found pages
- Soft reveal animations on important sections
- Image skeleton states for smoother loading
- Contact form integration with EmailJS

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- React Icons
- EmailJS

## Project Structure

```text
app/
  (site)/
    (pages)/
  components/
  layout.tsx
  not-found.tsx
data/
  en.json
  hu.json
  projects.json
public/
  works/
  works2/
  project_docs/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Content and Data

Project and language content is stored in the `data` folder.

- `data/hu.json` contains Hungarian text content
- `data/en.json` contains English text content
- `data/projects.json` contains project-related structured data

Images, documents, and project media are stored in the `public` folder.

## Design Notes

The UI uses a light visual style with soft blue accents, simple motion, and clean spacing. The goal is to keep the experience modern and smooth without too much visual noise.

## Build Note

The project currently uses `next/font/google` in the main layout. Because of this, the build may need external network access to download the fonts during build time. For restricted CI or offline builds, local fonts may be a better option.

## Author

Thomas Horvath  
Frontend Developer
