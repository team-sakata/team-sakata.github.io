import { defineCollection, z } from 'astro:content';

const researchCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        titleEn: z.string(),
        keywords: z.array(z.string()),
        order: z.number().default(0),
    }),
});

const membersCollection = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        titleEn: z.string().optional(),
        items: z.array(z.object({
            avatar: z.string(),
            name: z.string(),
            role: z.string().optional(),
            roleEn: z.string().optional(),
            id: z.string().optional(), // For linking to member pages
            image: z.string().optional(),
            description: z.string().optional(),
            location: z.string().optional(),
            researchAreas: z.string().optional(),
            courses: z.string().optional(),
        })),
        order: z.number().default(0),
    }),
});

const newsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        date: z.string(),
        text: z.string(),
        hidden: z.boolean().default(false),
        order: z.number().default(0),
    }),
});

const publicationsCollection = defineCollection({
    type: 'data',
    schema: z.array(z.object({
        title: z.string(),
        authors: z.string(),
        venue: z.string(),
        hidden: z.boolean().default(false),
        year: z.string().optional(),
        category: z.enum(['preprint', 'journal', 'conference', 'review', 'invited_lecture']).optional(),
    })),
});

const researchFocusCollection = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        description_short: z.string().optional(),
        image: z.string().optional(),
        link: z.string().optional(),
        label: z.string().optional(),
        order: z.number().default(0),
    }),
});

const activityCollection = defineCollection({
    type: 'data',
    schema: z.object({
        date: z.string(), // YYYY-MM-DD format
        title: z.string(),
        description: z.string(),
        description_short: z.string().optional(),
        image: z.string().optional(),
        link: z.string().optional(),
    }),
});

export const collections = {
    research: researchCollection,
    members: membersCollection,
    news: newsCollection,
    publications: publicationsCollection,
    'research-focus': researchFocusCollection,
    activity: activityCollection,
};
