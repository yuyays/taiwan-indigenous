import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const peoples = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/peoples",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    slug: z.string(),
    locale: z.enum(["en", "ja"]),
    name: z.string(),
    chineseName: z.string(),
    region: z.string(),
    mapLabel: z.string(),
    introduction: z.string(),
    memorableFact: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
    accent: z.string(),
    reviewStatus: z.literal("prototype"),
  }),
});

export const collections = { peoples };
