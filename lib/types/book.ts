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
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description?: string;
  publicationId?: string;
  isActive: boolean;
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
  publicationId: string;
  subjectId: string;
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
  publicationId: string;
  subjectId: string;
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
  isActive?: boolean;
}

export interface UpdatePublicationDto {
  name?: string;
  slug?: string;
  description?: string;
  logo?: string;
  status?: BookStatus;
  isActive?: boolean;
}

// Subject DTOs
export interface CreateSubjectDto {
  name: string;
  slug: string;
  description?: string;
  publicationId?: string;
  isActive?: boolean;
}

export interface UpdateSubjectDto {
  name?: string;
  slug?: string;
  description?: string;
  publicationId?: string;
  isActive?: boolean;
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

// Order types
export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export type PaymentMethod = "COD" | "CARD" | "BANK_TRANSFER" | "MOBILE_BANKING";

export interface OrderItem {
  id: string;
  orderId: string;
  bookId: string;
  bookTitle: string;
  bookPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  addressId?: string;
  orderNumber: string;
  subtotal: number;
  discount?: number;
  shipping?: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  orderItems?: OrderItem[];
}

// Order DTOs
export interface CreateOrderDto {
  addressId: string;
  discount?: number;
  shipping?: number;
  paymentMethod?: PaymentMethod;
  notes?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
}

// User types
export type UserRole = "ADMIN" | "USER";

export type UserProvider = "EMAIL" | "GOOGLE" | "FACEBOOK" | "APPLE";

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  provider: UserProvider;
  providerId?: string;
  avatar?: string;
  role: UserRole;
  emailVerified: boolean;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

// User DTOs
export interface CreateUserDto {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  role?: UserRole;
  provider?: UserProvider;
  providerId?: string;
  avatar?: string;
  status?: UserStatus;
}

export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  avatar?: string;
  role?: UserRole;
  status?: UserStatus;
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

// Tree structure types
export interface BookTreeBook {
  id: string;
  title: string;
  slug: string;
  price: number;
  thumbnail?: string;
}

export interface BookTreeSubject {
  subject: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
  };
  books: BookTreeBook[];
}

export interface BookTreePublication {
  publication: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
  };
  subjects: BookTreeSubject[];
}
