/// <reference types="astro/client" />

declare module "*.yaml" {
    const value: any;
    export default value;
}

declare module "*/news.yaml" {
    const value: {
        date: string;
        text: string;
        link?: string;
    }[];
    export default value;
}
