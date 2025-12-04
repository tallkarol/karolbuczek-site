# karolbuczek.com

Portfolio and interactive resume site for Karol Buczek - Web Systems Engineer.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Theme**: next-themes for dark/light mode
- **Email**: Resend API (for contact form)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your:
- `RESEND_API_KEY` - Your Resend API key for contact form emails
- `CONTACT_EMAIL` - Email address to receive contact form submissions

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
karolbuczek/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with ThemeProvider
│   ├── page.tsx           # Homepage
│   ├── contact/           # Contact page
│   ├── resume/            # Resume page (placeholder)
│   ├── case-studies/      # Case studies listing
│   └── api/               # API routes
│       └── contact/       # Contact form API
├── components/
│   ├── layout/            # Header, Footer, LayoutShell
│   ├── sections/          # Homepage sections
│   ├── contact/           # Contact form component
│   └── ui/                # shadcn/ui components
└── lib/                   # Utility functions
```

## Features

- **Homepage** with 7 sections:
  - Hero intro
  - Stats strip
  - Featured case studies
  - Interactive resume preview
  - Skills map
  - Philosophy/How I Work
  - Contact CTA

- **Dark/Light Mode** - Theme toggle in header
- **Contact Form** - Simple form with Resend integration
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Framer Motion for transitions

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

- `RESEND_API_KEY` - Required for contact form to work
- `CONTACT_EMAIL` - Email to receive contact form submissions

## Notes

- Case studies data is currently hardcoded in `CaseStudyGrid.tsx`
- Resume page is a placeholder - full interactive resume coming soon
- Individual case study detail pages coming soon

