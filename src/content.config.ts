import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files from `src/content/blog/`.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Every post is type-checked against this schema at build time.
	schema: z.object({
		title: z.string().max(70),
		// Keep meta descriptions within Google's 150-160 character sweet spot.
		description: z.string().min(150).max(160),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// Path to the hero image, resolved relative to the site root (in /public).
		heroImage: z.string(),
		author: z.string(),
		category: z.string(),
		tags: z.array(z.string()).default([]),
		primaryKeyword: z.string(),
		// Links a post to its translation in the other language.
		translationKey: z.string(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
