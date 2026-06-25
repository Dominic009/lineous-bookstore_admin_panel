# Book CRUD Implementation Plan

## Overview
This document outlines the implementation plan for the Book management module in the admin panel, following the backend API specifications from `docs/Book_Implementation_Guide.md` and `docs/Admin_Implementation_Guide.md`.

## Core Principles
- **Centralized API calls** - All API endpoints in dedicated service files
- **Simple custom hooks** - Efficient React Query hooks with proper caching
- **No unnecessary API calls** - Proper query invalidation and dependency management
- **Backend error handling** - Display backend error messages to users

---

## 1. API Service Layer (`lib/api/`)

### 1.1 Create `lib/api/books.ts`
Centralized book API service with all endpoints:

```typescript
// Endpoints to implement:
- GET /api/books - Get all books (public)
- GET /api/books/:id - Get book by ID (public)
- POST /api/books - Create book (admin, multipart/form-data)
- PATCH /api/books/:id - Update book (admin)
- DELETE /api/books/:id - Delete book (admin)
```

### 1.2 Create `lib/api/publications.ts`
Publication API for dropdown in book form:
```typescript
- GET /api/publications - Get all publications (public)
```

### 1.3 Create `lib/api/subjects.ts`
Subject API for dropdown in book form:
```typescript
- GET /api/subjects - Get all subjects (public)
```

### 1.4 Create `lib/api/book-attachments.ts`
Book attachment API:
```typescript
- POST /api/upload/book-attachment - Upload attachment (admin, multipart/form-data)
- DELETE /api/upload/book-attachment/:id - Delete attachment (admin)
```

---

## 2. React Query Hooks (`lib/hooks/`)

### 2.1 Create `lib/hooks/use-books.ts`
Custom hooks for book operations:
```typescript
- useBooks() - Fetch all books with proper caching
- useBook(id) - Fetch single book
- useCreateBook() - Create book mutation
- useUpdateBook() - Update book mutation
- useDeleteBook() - Delete book mutation
```

### 2.2 Create `lib/hooks/use-publications.ts`
```typescript
- usePublications() - Fetch all publications
```

### 2.3 Create `lib/hooks/use-subjects.ts`
```typescript
- useSubjects() - Fetch all subjects
```

---

## 3. Type Definitions (`lib/types/`)

### 3.1 Create `lib/types/book.ts`
TypeScript interfaces matching backend:
```typescript
- Book interface
- BookAttachment interface
- CreateBookDto interface
- UpdateBookDto interface
- BookStatus enum
- AttachmentType enum
```

---

## 4. UI Components (`components/books/`)

### 4.1 Update `components/books/books-table.tsx`
- Replace static data with real API data
- Add loading states
- Add error handling with backend error messages
- Add action buttons (Edit, Delete)
- Display thumbnail image from Cloudinary URL

### 4.2 Create `components/books/book-form.tsx`
Form component with:
- Text inputs: title, slug, isbn, price, discountPrice, edition, language
- Textarea: shortDescription, description
- Date picker: publicationDate
- Number input: stock
- Select dropdowns: status, publicationId, subjectId
- File upload: thumbnail (single image)
- File upload: attachments (multiple images)
- Form validation
- Error display from backend

### 4.3 Create `components/books/book-dialog.tsx`
Dialog wrapper for create/edit forms:
- Modal for creating new book
- Modal for editing existing book
- Proper form state management

### 4.4 Update `components/books/status-badge.tsx`
- Ensure it handles all BookStatus values: DRAFT, PUBLISHED, ARCHIVED

---

## 5. Page Integration (`app/admin/books/`)

### 5.1 Update `app/admin/books/page.tsx`
- Add state for create/edit dialog
- Add delete confirmation
- Add search functionality
- Add filter by status
- Integrate with useBooks hook
- Handle loading and error states

### 5.2 Create `app/admin/books/create/page.tsx`
- Standalone create book page (optional, if not using dialog)

### 5.3 Create `app/admin/books/edit/[id]/page.tsx`
- Standalone edit book page (optional, if not using dialog)

---

## 6. API Response Handling

### 6.1 Response Format
All API responses follow this structure:
```json
{
  "message": "Operation completed successfully",
  "status": "success",
  "data": { ... }
}
```

### 6.2 Error Format
```json
{
  "statusCode": 400,
  "message": ["error message"],
  "error": "Bad Request"
}
```

### 6.3 Error Handling Strategy
- Extract error message from `error.response.data.message`
- Display in toast notifications or form errors
- Handle 401 unauthorized (redirect to login)
- Handle 403 forbidden (show permission denied)

---

## 7. File Upload Implementation

### 7.1 FormData Structure for Create Book
```typescript
const formData = new FormData();
formData.append('title', title);
formData.append('slug', slug);
formData.append('price', price.toString());
// ... other fields
formData.append('thumbnail', thumbnailFile);
attachments.forEach(file => formData.append('attachments', file));
```

### 7.2 Cloudinary Integration
- Backend handles Cloudinary upload
- Frontend sends files as multipart/form-data
- Response includes `url` and `publicId` for attachments

---

## 8. Implementation Order

1. [x] Create type definitions (`lib/types/book.ts`)
2. [x] Create API services (`lib/api/books.ts`, `lib/api/publications.ts`, `lib/api/subjects.ts`, `lib/api/book-attachments.ts`)
3. [x] Create React Query hooks (`lib/hooks/use-books.ts`, `lib/hooks/use-publications.ts`, `lib/hooks/use-subjects.ts`)
4. [x] Update `components/books/books-table.tsx` with real data
5. [x] Create `components/books/book-form.tsx`
6. [x] Create `components/books/book-dialog.tsx`
7. [x] Update `app/admin/books/page.tsx` with full functionality
8. [x] Add error handling and loading states throughout

---

## 9. Key Features

### 9.1 Create Book
- Form with all required fields
- File upload for thumbnail and attachments
- Validation before submission
- Success/error feedback

### 9.2 Read Books
- Paginated list (if needed)
- Search by title
- Filter by status
- Display thumbnail from Cloudinary

### 9.3 Update Book
- Pre-fill form with existing data
- Update metadata (not images - use attachment endpoints)
- Validation before submission

### 9.4 Delete Book
- Confirmation dialog
- Soft delete (backend handles)
- UI update after success

### 9.5 File Management
- Upload attachments via `/api/upload/book-attachment`
- Delete attachments via `/api/upload/book-attachment/:id`
- Display attachment gallery

---

## 10. Dependencies to Check

- `react-query` or `@tanstack/react-query` - Already installed?
- `react-hook-form` - For form handling
- `zod` - For validation
- `sonner` - For toast notifications (already in UI components)

---

## 11. Notes

- All API calls use the centralized `apiClient` from `lib/api/axios.ts`
- Authentication handled via Bearer token in request interceptor
- Admin-only operations protected by role check in backend
- Non-admin users only see published books (backend filter)