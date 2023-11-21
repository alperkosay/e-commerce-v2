export interface Category {
    id: number;
    attributes: {
        createdAt: Date;
        updatedAt: Date;
        publishedAt?: Date;
        title?: string;
        description?: string;
        slug?: string;
        parentCategory?: { data: Category };
        subCategories: { data: Category[] };
    };
}
