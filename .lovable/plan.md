## Homepage restructure

Edit `src/pages/Index.tsx` so the homepage renders exactly these 5 sections, in order:

1. `HeroSection` (modified)
2. `SeeWhatYouGetSection` (unchanged)
3. `HowItWorksSection` (unchanged)
4. New inline `PricingTeaser` (centered single-line section)
5. `EarlyAccessSection` (moved to bottom, directly above `Footer`)

Remove from the homepage only (files kept intact, still used on their own pages where applicable):
- `WhatYouCanCreateSection`
- `BuiltForClassroomsSection`
- `FeaturesSection`
- `PricingSection` (full tier cards)
- Any bundle / satisfaction-guarantee block on the homepage

### Hero changes (`src/components/landing/HeroSection.tsx`)

- Headline replaced with a single line: **"Your complete AI teaching toolkit — built for K–12."** (keep current gradient treatment on the second half — split as `Your complete AI teaching toolkit —` + gradient `built for K–12.`).
- Primary CTA label changed from "Start Free" to **"Generate your first lesson"** (still links to `/signup`, keeps gradient button styling).
- Secondary "Browse Resources" button, eyebrow badge, and sub-copy left unchanged.

### Pricing teaser (new, inline in `Index.tsx`)

Centered section, same container/spacing rhythm as other sections:

```
Free to start. Upgrade when you're ready.
See all plans →   (text link to /pricing)
```

No tier cards, no imports from `PricingSection`.

## Navigation changes (`src/components/landing/Navbar.tsx`)

Update `navLinks` to include a Home entry plus the full footer link set (deduped), in this order:

`Home (/) · About (/about) · Pricing (/pricing) · Resource Shop (/shop) · Contact (/contact) · Terms (/terms) · Privacy (/privacy)`

Applies to both desktop nav and the mobile Sheet menu (existing rendering loop already handles both). Logo, theme toggle, Log In, Start Free button, and all styling stay as-is.

Because `Navbar` is rendered on every public page (landing, About, Pricing, Contact, Terms, Privacy, Shop), this single edit satisfies "duplicate the footer links at the top of all pages." `Footer` is left unchanged so the links still appear at the bottom too.

## Out of scope / unchanged

- All other pages, routes, and dashboard.
- Footer content and layout.
- Brand colors, gradients, fonts, logo sizing.
- The removed section components themselves (files retained for use elsewhere / future).
