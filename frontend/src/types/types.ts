export enum Category {
    Food = "FOOD",
    Education = "EDUCATION",
    Entertainment = "ENTERTAINMENT",
    None = "NONE",
}

export type ReceiptProps = {
    _id: string;
    userId: string;
    name: string;
    date: string;
    items: ItemProps[];
};
export type ItemProps = {
    name?: string;
    price?: number;
    category?: Category;
};
