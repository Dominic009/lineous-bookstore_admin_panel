export const QueryKeys = {
    books: ["books"],

    booksTree: ["books", "tree"],

    users: ["users"],

    orders: ["orders"],

    receiptDetails: (orderId: string) => ["orders", orderId, "receipt"],

    verifyReceipt: (receiptNumber: string) => ["receipts", "verify", receiptNumber],

    publications: ["publications"],

    subjects: ["subjects"],

    teachers: ["teachers"],

    categories: ["categories"],

    banners: ["banners"],

    reviews: ["reviews"],

    settings: ["settings"],

    bookPapers: ["bookPapers"],

    bookPapersByBook: (bookId: string) => ["bookPapers", "book", bookId],
} as const;
