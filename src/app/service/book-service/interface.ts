export type BookMetaData = {
    id: string;
}

export type BookCoreData = {
    title: string;
    description: string;
    authors: Author[]
}

export type Author = {
    firstName: string;
    lastName: string;
}

export type Book = BookMetaData & BookCoreData;
