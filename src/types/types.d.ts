import { OutputData } from "@editorjs/editorjs";

export type Author = {
    userName: string;
    name: string;
    walletAddress: string;
    address: string;
    description: string;
    img?: string;
    articles?: ArticleType[];
    findName?: string
};

type ThoughtEdition = {
    title: string,
    imageURI: string,
    contentURI: string
    price: string,
    totalPurchased?: number
    createdAt?: string,
    address?: string,
    editionId?: number,
}

export type ArticleType = {
    authorAddress: string;
    authorName: string;
    authorDesc: string;
    authorImg: string;
    title: string;
    content: OutputData | undefined;
    coverImg: string;
    readTime: number;
    createdAt: string;
    id: string;
    likes: number;
    price: string;
}

export type ArticleForIPFS = {
    authorAddress: string;
    authorName: string;
    authorDesc: string;
    authorImg: string;
    title: string;
    content: string;
    coverImg: string;
    readTime: number;
    createdAt: string;
    id: string;
    likes: number;
    price: number;
}
