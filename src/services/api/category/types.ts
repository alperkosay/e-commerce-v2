export interface Category {
    id: number;
    attributes: {
        createdAt: Date;
        updatedAt: Date;
        publishedAt?: Date;
        title?: string;
        description?: string;
        slug?: string;
        categories: { data: Category[] };
        root_category: boolean;
    };
}
