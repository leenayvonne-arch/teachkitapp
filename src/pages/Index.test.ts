import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Guardrail: the homepage (/) must render EXACTLY these top-level sections in
 * this exact order, between <Navbar /> and <Footer />. Adding, removing, or
 * reordering sections in src/pages/Index.tsx will fail this test on purpose —
 * update the EXPECTED array intentionally if the homepage spec changes.
 */
const EXPECTED = [
  "Navbar",
  "HeroSection",
  "SeeWhatYouGetSection",
  "HowItWorksSection",
  "PricingTeaser",
  "EarlyAccessSection",
  "Footer",
];

const FORBIDDEN = [
  "WhatYouCanCreateSection",
  "BuiltForClassroomsSection",
  "FeaturesSection",
  "PricingSection",
];

describe("Homepage section order", () => {
  const source = readFileSync(
    resolve(__dirname, "Index.tsx"),
    "utf8",
  );

  it("renders the exact expected sections in order", () => {
    // Match self-closing JSX components like <Foo /> at the top level of Index.
    const matches = Array.from(source.matchAll(/<([A-Z][A-Za-z0-9]*)\s*\/>/g)).map(
      (m) => m[1],
    );
    expect(matches).toEqual(EXPECTED);
  });

  it("does not import or render any removed homepage sections", () => {
    for (const name of FORBIDDEN) {
      expect(
        source.includes(name),
        `Homepage must not reference ${name}`,
      ).toBe(false);
    }
  });
});
