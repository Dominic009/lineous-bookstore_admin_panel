// Book type definitions matching backend API

export type BookStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type AttachmentType = "IMAGE" | "PDF" | "BANNER" | "THUMBNAIL";

export interface Publication {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
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
  stock?: boolean;
  stockAmount?: number;
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
  stock?: boolean;
  stockAmount?: number;
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
  stock?: boolean;
  stockAmount?: number;
  status?: BookStatus;
  publicationId?: string;
  subjectId?: string;
}

// Publication DTOs
export interface CreatePublicationDto {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  status?: BookStatus;
}

export interface UpdatePublicationDto {
  name?: string;
  slug?: string;
  description?: string;
  logo?: string;
  status?: BookStatus;
}

// Subject DTOs
export interface CreateSubjectDto {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateSubjectDto {
  name?: string;
  slug?: string;
  description?: string;
}

// Review DTOs
export interface CreateReviewDto {
  bookId: string;
  reviewerName: string;
  designation?: string;
  rating: number;
  comment?: string;
  displayOrder?: number;
}

export interface UpdateReviewDto {
  reviewerName?: string;
  designation?: string;
  rating?: number;
  comment?: string;
  displayOrder?: number;
}

export interface Review {
  id: string;
  bookId: string;
  reviewerName: string;
  designation?: string;
  rating: number;
  comment?: string;
  displayOrder: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
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
