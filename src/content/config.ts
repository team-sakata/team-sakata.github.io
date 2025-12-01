import { defineCollection, z } from 'astro:content';

const membersCollection = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        titleEn: z.string().optional(),
        items: z.array(z.object({
            avatar: z.string(),
            name: z.string(),
            nameEn: z.string().optional(),
            role: z.string().optional(),
            roleEn: z.string().optional(),
            id: z.string().optional(), // For linking to member pages
            image: z.string().optional(),
            description: z.string().optional(),
            descriptionEn: z.string().optional(),
            location: z.string().optional(),
            locationEn: z.string().optional(),
            researchAreas: z.string().optional(),
            researchAreasEn: z.string().optional(),
            courses: z.string().optional(),
            coursesEn: z.string().optional(),
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
        title_ja: z.string().optional(),
        title_en: z.string().optional(),
        description: z.string(),
        description_ja: z.string().optional(),
        description_en: z.string().optional(),
        description_short: z.string().optional(),
        description_short_en: z.string().optional(),
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
        title_ja: z.string().optional(),
        title_en: z.string().optional(),
        description: z.string(),
        description_ja: z.string().optional(),
        description_en: z.string().optional(),
        description_short: z.string().optional(),
        description_short_en: z.string().optional(),
        image: z.string().optional(),
        link: z.string().optional(),
    }),
});

export const collections = {
    members: membersCollection,
    news: newsCollection,
    publications: publicationsCollection,
    'research-focus': researchFocusCollection,
    activity: activityCollection,
};
