# Pages & Components — Initial Map

This is intentionally lightweight so it can be extended as the project grows.

## Primary Pages

1. `/` — **Homepage**
   - Hero, snapshot stats, featured case studies, interactive resume preview, skills/systems map, contact CTA.

2. `/resume` — **Interactive Resume**
   - Timeline view of roles/projects.
   - Filters (e.g., Dev, Marketing, Systems, AI, Leadership).
   - Toggle between:
     - “Story” (narrative view)
     - “Timeline” (chronological)
     - “Snapshot” (compact card view)

3. `/case-studies`
   - Index of all case studies with filters and search.

4. `/case-studies/[slug]`
   - Deep-dive pages for individual projects (problem → constraints → solution → outcomes → stack/roles).

5. `/now` or `/about`
   - Short “what I’m working on now” section.
   - A bit more personal context than the homepage.

---

## Core Components (first batch)

These names are just suggestions so Cursor has some semantic handles.

- `LayoutShell`
  - Shared layout, nav, footer, basic page transitions.

- `HeroIntro`
  - Used on homepage.
  - Props: title, subtitle, description, CTAs.

- `StatStrip`
  - Horizontal list of quick stats / credibility.

- `CaseStudyCard`
  - Used on homepage and /case-studies.
  - Props: title, tags, summary, metric, href.

- `CaseStudyGrid`
  - Responsive grid of `CaseStudyCard` with optional filters.

- `ResumePreview`
  - Mini version of the interactive resume for homepage.
  - Could show a few roles and a CTA.

- `InteractiveResume`
  - Main component on `/resume`.
  - Internally can have:
    - `ResumeTimeline`
    - `ResumeFilters`
    - `ResumeHighlights`

- `SkillsMap`
  - Visual representation of core skills areas (Dev / Marketing / Systems).

- `Section`
  - Generic section wrapper with consistent paddings, max-width, and optional background variants.

- `CTASection`
  - Reusable contact / CTA block with heading, text, and buttons.

---

## Interaction / Animation Notes

- Use motion to:
  - Emphasize hierarchy (sections sliding into view, fading in).
  - Give feedback (hover states, card elevation, subtle transforms).
- Avoid:
  - Overly busy or distracting parallax.
  - Animations that hurt readability.

---

## Future Ideas (not required for v1)

- Dark/light theme toggle.
- Inline code snippets or diagrams in case studies.
- “Playground” or small embedded demos of select tools if/when I open source anything.
# Pages & Components — Initial Map

This is intentionally lightweight so it can be extended as the project grows.

## Primary Pages

1. `/` — **Homepage**
   - Hero, snapshot stats, featured case studies, interactive resume preview, skills/systems map, contact CTA.

2. `/resume` — **Interactive Resume**
   - Timeline view of roles/projects.
   - Filters (e.g., Dev, Marketing, Systems, AI, Leadership).
   - Toggle between:
     - “Story” (narrative view)
     - “Timeline” (chronological)
     - “Snapshot” (compact card view)

3. `/case-studies`
   - Index of all case studies with filters and search.

4. `/case-studies/[slug]`
   - Deep-dive pages for individual projects (problem → constraints → solution → outcomes → stack/roles).

5. `/now` or `/about`
   - Short “what I’m working on now” section.
   - A bit more personal context than the homepage.

---

## Core Components (first batch)

These names are just suggestions so Cursor has some semantic handles.

- `LayoutShell`
  - Shared layout, nav, footer, basic page transitions.

- `HeroIntro`
  - Used on homepage.
  - Props: title, subtitle, description, CTAs.

- `StatStrip`
  - Horizontal list of quick stats / credibility.

- `CaseStudyCard`
  - Used on homepage and /case-studies.
  - Props: title, tags, summary, metric, href.

- `CaseStudyGrid`
  - Responsive grid of `CaseStudyCard` with optional filters.

- `ResumePreview`
  - Mini version of the interactive resume for homepage.
  - Could show a few roles and a CTA.

- `InteractiveResume`
  - Main component on `/resume`.
  - Internally can have:
    - `ResumeTimeline`
    - `ResumeFilters`
    - `ResumeHighlights`

- `SkillsMap`
  - Visual representation of core skills areas (Dev / Marketing / Systems).

- `Section`
  - Generic section wrapper with consistent paddings, max-width, and optional background variants.

- `CTASection`
  - Reusable contact / CTA block with heading, text, and buttons.

---

## Interaction / Animation Notes

- Use motion to:
  - Emphasize hierarchy (sections sliding into view, fading in).
  - Give feedback (hover states, card elevation, subtle transforms).
- Avoid:
  - Overly busy or distracting parallax.
  - Animations that hurt readability.

---

## Future Ideas (not required for v1)

- Dark/light theme toggle.
- Inline code snippets or diagrams in case studies.
- “Playground” or small embedded demos of select tools if/when I open source anything.
