import { getCollection } from "astro:content";

export async function getSortedActivity() {
    const activity = await getCollection("activity");
    return activity.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

export async function getSortedMembers() {
    const members = await getCollection("members");
    return members.sort((a, b) => a.data.order - b.data.order);
}

export async function getResearchFocus() {
    return await getCollection("research-focus");
}

export async function getPublications() {
    const publicationsCollection = await getCollection("publications");
    const publicationsEntry = publicationsCollection.find((p) => p.id === "list");
    return publicationsEntry ? publicationsEntry.data : [];
}
