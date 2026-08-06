import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.string().default("GEO"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    author: z.string().default("GEO 咨询团队"),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
