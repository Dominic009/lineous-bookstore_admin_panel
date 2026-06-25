// Book type definitions matching backend API

export type BookStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type AttachmentType = "IMAGE" | "PDF" | "BANNER" | "THUMBNAIL";

export interface Publication {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookAttachment {
  id: string;
  bookId: string;
  url: string;
  publicId: string;
  type: AttachmentType;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  isbn?: string;
  price: number;
  discountPrice?: number;
  publicationDate?: string;
  edition?: string;
  language?: string;
  stock: number;
  status: BookStatus;
  thumbnail?: string;
  publicationId?: string;
  subjectId?: string;
  createdAt: string;
  updatedAt: string;
  publication?: Publication;
  subject?: Subject;
  attachments?: BookAttachment[];
}

// DTOs for API requests
export interface CreateBookDto {
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  isbn?: string;
  price: number;
  discountPrice?: number;
  publicationDate?: string;
  edition?: string;
  language?: string;
  stock?: number;
  status?: BookStatus;
  publicationId?: string;
  subjectId?: string;
}

export interface UpdateBookDto {
  title?: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  isbn?: string;
  price?: number;
  discountPrice?: number;
  publicationDate?: string;
  edition?: string;
  language?: string;
  stock?: number;
  status?: BookStatus;
  publicationId?: string;
  subjectId?: string;
}

// API Response types
export interface ApiResponse<T> {
  message: string;
  status: string;
  data: T;
}

export interface PaginatedResponse<T> {
  message: string;
  status: string;
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}
