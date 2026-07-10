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

export interface PriceRange {
  min: number;
  max: number;
  display: string;
}

export interface BookPaper {
  id: string;
  bookId: string;
  code?: string;
  name: string;
  price: number;
  discountPrice?: number;
  discountStartDate?: string;
  discountEndDate?: string;
  stock: number;
  isbn?: string;
  pageCount?: number;
  thumbnail?: string;
  sortOrder: number;
  isDefault: boolean;
  status: "DRAFT" | "PUBLISHED";
  effectivePrice: number;
  isInStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  publicationDate?: string;
  edition?: string;
  language?: string;
  status: BookStatus;
  thumbnail?: string;
  publicationId: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  publication?: Publication;
  subject?: Subject;
  attachments?: BookAttachment[];
  papers?: BookPaper[];
  priceRange?: PriceRange | null;
}

// DTOs for API requests
export interface CreateBookDto {
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  publicationDate?: string;
  edition?: string;
  language?: string;
  status?: BookStatus;
  publicationId: string;
  subjectId: string;
}

export interface UpdateBookDto {
  title?: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  publicationDate?: string;
  edition?: string;
  language?: string;
  status?: BookStatus;
  publicationId?: string;
  subjectId?: string;
}

export interface CreateBookPaperDto {
  bookId: string;
  code?: string;
  name: string;
  price: number;
  discountPrice?: number;
  discountStartDate?: string;
  discountEndDate?: string;
  stock?: number;
  isbn?: string;
  pageCount?: number;
  thumbnail?: string;
  sortOrder?: number;
  isDefault?: boolean;
  status?: "DRAFT" | "PUBLISHED";
}

export interface UpdateBookPaperDto {
  code?: string;
  name?: string;
  price?: number;
  discountPrice?: number;
  discountStartDate?: string;
  discountEndDate?: string;
  stock?: number;
  isbn?: string;
  pageCount?: number;
  thumbnail?: string;
  sortOrder?: number;
  isDefault?: boolean;
  status?: "DRAFT" | "PUBLISHED";
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

export interface OrderItemPaper {
  id: string;
  name: string;
  price: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  bookId: string;
  paperId?: string;
  bookTitle: string;
  paperName?: string;
  paperPrice?: string;
  quantity: number;
  subtotal: string;
  paper?: OrderItemPaper;
}

export interface Payment {
  id: string;
  orderId: string;
  gateway: string;
  transactionId?: string | null;
  amount: string;
  currency: string;
  status: PaymentStatus;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface OrderAddress {
  id: string;
  name?: string;
  phone?: string;
  district?: string;
  addressLine?: string;
}

export interface Order {
  id: string;
  userId: string;
  addressId?: string;
  orderNumber: string;
  subtotal: string;
  discount?: string;
  shipping?: string;
  total: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  orderItems?: OrderItem[];
  payments?: Payment[];
  user?: OrderUser;
  address?: OrderAddress;
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

// Receipt types
export interface ReceiptOrder {
  id: string;
  orderNumber: string;
  subtotal: string;
  discount: string;
  shipping: string;
  total: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  orderItems?: OrderItem[];
  address?: OrderAddress;
  user?: OrderUser;
}

export interface Receipt {
  id: string;
  orderId: string;
  receiptNumber: string;
  pdfUrl: string;
  publicId: string;
  qrCodeUrl: string;
  generatedAt: string;
  createdAt: string;
  updatedAt: string;
  order?: ReceiptOrder;
}

export type ReceiptDetails = Receipt;

export interface ReceiptVerification {
  id: string;
  orderId: string;
  receiptNumber: string;
  pdfUrl: string;
  qrCodeUrl: string;
  generatedAt: string;
  order: {
    orderNumber: string;
    total: string;
    status: OrderStatus;
    orderItems?: OrderItem[];
  };
}

export interface GenerateReceiptResponse {
  pdfUrl: string;
  receiptNumber: string;
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
  priceRange?: PriceRange | null;
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
