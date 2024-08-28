import { Category, ReceiptProps } from "@/types/types";

export const DEFAULT_RECEIPT: ReceiptProps = {
    _id: "",
    userId: "",
    date: "",
    name: "",
    items: [],
};

export const EMOJI: Partial<Record<Category, string>> = {
    [Category.Food]: "🍔",
    [Category.Education]: "🏫",
    [Category.Entertainment]: "🎮",
    [Category.None]: "None",
};