# 📋 Book Paper Variant — Admin Panel Implementation Plan

## Overview
This plan details all changes required to update the admin panel to work with the new **parent-child Book/BookPaper API model**. The backend has removed pricing, stock, and ISBN from `Book` and moved them to a new `BookPaper` entity.

---

## Phase 1: Type Definitions & API Layer

### 1.1 Update `lib/types/book.ts`

**Changes to `Book` interface:**
- **Remove:** `isbn`, `price`, `discountPrice`, `stock`, `stockAmount`
- **Add:** `papers: BookPaper[]`, `priceRange: PriceRange | null`

**New types to add:**
```typescript
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

export interface PriceRange {
  min: number;
  max: number;
  display: string;
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
```

**Update `CreateBookDto` and `UpdateBookDto`:**
- **Remove:** `isbn`, `price`, `discountPrice`, `stock`, `stockAmount`

**Update `BookTreeBook`:**
- **Remove:** `price`
- **Add:** `priceRange: PriceRange | null`

**Update `OrderItem`:**
- **Add:** `paperId?: string`, `paperName?: string`, `paperPrice?: number`

---

### 1.2 Update `lib/api/books.ts`

**Add new BookPaper API methods:**
```typescript
// BookPaper CRUD
export const getBookPapers = async (bookId: string): Promise<ApiResponse<BookPaper[]>> => {
  const response = await apiClient.get<ApiResponse<BookPaper[]>>(`/book-papers/book/${bookId}`);
  return response.data;
};

export const getBookPaper = async (id: string): Promise<ApiResponse<BookPaper>> => {
  const response = await apiClient.get<ApiResponse<BookPaper>>(`/book-papers/${id}`);
  return response.data;
};

export const createBookPaper = async (data: CreateBookPaperDto): Promise<ApiResponse<BookPaper>> => {
  const response = await apiClient.post<ApiResponse<BookPaper>>("/book-papers", data);
  return response.data;
};

export const updateBookPaper = async (id: string, data: UpdateBookPaperDto): Promise<ApiResponse<BookPaper>> => {
  const response = await apiClient.patch<ApiResponse<BookPaper>>(`/book-papers/${id}`, data);
  return response.data;
};

export const deleteBookPaper = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/book-papers/${id}`);
  return response.data;
};
```

**Update `booksApi` export** to include new methods.

---

### 1.3 Update `constants/query-key.ts`

**Add:**
```typescript
bookPapers: ["bookPapers"],
bookPapersByBook: (bookId: string) => ["bookPapers", "book", bookId],
```

---

## Phase 2: React Query Hooks

### 2.1 Update `lib/hooks/use-books.ts`

**Add new hooks:**
```typescript
// Hook to fetch papers for a book
export function useBookPapers(bookId: string) {
  return useQuery({
    queryKey: QueryKeys.bookPapersByBook(bookId),
    queryFn: async () => {
      const response = await booksApi.getBookPapers(bookId);
      return response.data;
    },
    enabled: !!bookId,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to create paper
export function useCreateBookPaper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateBookPaperDto) => {
      const response = await booksApi.createBookPaper(data);
      return response;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.bookPapersByBook(variables.bookId) });
      queryClient.invalidateQueries({ queryKey: QueryKeys.books });
      toast.success(response.message || "Paper created successfully");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}

// Hook to update paper
export function useUpdateBookPaper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBookPaperDto }) => {
      const response = await booksApi.updateBookPaper(id, data);
      return response;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.books });
      // Invalidate specific book papers query if we can derive bookId
      queryClient.invalidateQueries({ queryKey: QueryKeys.bookPapers });
      toast.success(response.message || "Paper updated successfully");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}

// Hook to delete paper
export function useDeleteBookPaper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await booksApi.deleteBookPaper(id);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.books });
      queryClient.invalidateQueries({ queryKey: QueryKeys.bookPapers });
      toast.success(response.message || "Paper deleted successfully");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}
```

---

## Phase 3: UI Components

### 3.1 Update `components/books/book-form.tsx`

**Remove from form:**
- ISBN field
- Price field
- Discount Price field
- Stock checkbox
- Stock Amount field

**Remove from `BookFormValues` type:**
- `isbn`, `price`, `discountPrice`, `stock`, `stockAmount`

**Remove from `originalValues` and `defaultValues`:**
- All removed fields

**Remove from `buildPartialUpdate`:**
- All removed field comparisons

**Remove from `onSubmit` FormData building:**
- All removed field appends

**Keep:**
- Title, Slug, Short Description, Description, Publication Date, Edition, Language, Status, Publication, Subject, Thumbnail, Attachments

---

### 3.2 Update `components/books/books-table.tsx`

**Remove columns:**
- ISBN
- Price
- Stock

**Add/modify columns:**
- **Price Range** — display `book.priceRange?.display || "-"`
- Optionally add a "Papers" column showing count of papers

**Price display logic:**
```typescript
<td className="px-6 py-4 text-sm font-medium">
  {book.priceRange?.display || "-"}
</td>
```

---

### 3.3 Update `components/books/books-tree-view.tsx`

**Change price display:**
```typescript
// Before:
<span className="text-xs text-muted-foreground">
  ${book.price}
</span>

// After:
<span className="text-xs text-muted-foreground">
  {book.priceRange?.display || "-"}
</span>
```

---

### 3.4 Update `app/admin/books/[id]/page.tsx`

**Remove from detail view:**
- `book.price` display
- `book.discountPrice` display
- `book.isbn` display
- `book.stock` / In Stock badge
- Add to Cart button (or disable it with message about needing papers)

**Add Papers Management Section:**
A new section below the book details that:
1. Lists all papers for the book using `useBookPapers(book.id)`
2. Shows: Code, Name, Price, Discount Price, Effective Price, Stock, ISBN, Page Count, Thumbnail, Default badge, Status
3. Has "Add Paper" button that opens a dialog/form
4. Has Edit/Delete actions per paper
5. Shows `priceRange` summary at the top

**New component needed:** `components/books/book-papers-manager.tsx`

---

### 3.5 Create `components/books/book-papers-manager.tsx`

**Purpose:** Manage papers for a single book.

**Features:**
- List existing papers in a table/card layout
- Add Paper button → opens `BookPaperForm` dialog
- Edit Paper → opens `BookPaperForm` dialog pre-filled
- Delete Paper → confirmation dialog
- Show `isDefault` badge (only one per book)
- Show `effectivePrice` and `isInStock` computed fields

**Props:**
```typescript
interface BookPapersManagerProps {
  bookId: string;
  bookTitle: string;
}
```

---

### 3.6 Create `components/books/book-paper-form.tsx`

**Purpose:** Form for creating/editing a single BookPaper.

**Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `code` | string | No | Short code like "A", "MCQ" |
| `name` | string | Yes | Display name |
| `price` | number | Yes | Base price |
| `discountPrice` | number | No | Must be ≤ price |
| `discountStartDate` | date | No | |
| `discountEndDate` | date | No | |
| `stock` | number | No | Default 0 |
| `isbn` | string | No | Unique per paper |
| `pageCount` | number | No | |
| `thumbnail` | file | No | Paper-specific image |
| `sortOrder` | number | No | Default 0 |
| `isDefault` | boolean | No | Only one per book |
| `status` | select | No | DRAFT/PUBLISHED |

**Behavior:**
- On create: POST to `/book-papers`
- On edit: PATCH to `/book-papers/:id`
- Validate `discountPrice ≤ price` if both provided
- Validate discount date range if provided

---

### 3.7 Create `components/books/book-paper-dialog.tsx`

**Purpose:** Dialog wrapper for `BookPaperForm`.

**Props:**
```typescript
interface BookPaperDialogProps {
  bookId: string;
  paper?: BookPaper | null; // null = create mode
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}
```

---

### 3.8 Update `components/books/book.actions.tsx`

**Add paper-related actions:**
- "Manage Papers" button → navigates to book detail page (or opens inline)
- Ensure existing View/Edit/Delete actions still work

---

## Phase 4: Navigation & Routing

### 4.1 Update `config/navigation.ts`

Ensure book detail page route is properly configured:
```
/admin/books/[id]
```

---

## Phase 5: Order & Cart Types (If Admin Panel Manages These)

### 5.1 Update Order Types in `lib/types/book.ts`

```typescript
export interface OrderItem {
  id: string;
  orderId: string;
  bookId: string;
  paperId?: string;
  bookTitle: string;
  paperName?: string;
  paperPrice?: number;
  bookPrice: number;
  quantity: number;
  subtotal: number;
}
```

### 5.2 Update Order Display Components

If admin panel shows order details:
- Show `paperName` and `paperPrice` in order items
- Show paper details if `paperId` exists

---

## Phase 6: Validation & Business Logic

### 6.1 Paper Validation Rules
- Only **one** paper per book can have `isDefault: true`
- `discountPrice` must be ≤ `price` if provided
- Discount dates must be valid range if provided
- `isbn` must be unique across all papers (if provided)

### 6.2 Book Creation Flow
1. Admin fills book form (shared info only)
2. On submit: `POST /books` → get `book.id`
3. Redirect to book detail page
4. Admin adds papers via paper manager
5. Book is sellable only after at least one paper is created

### 6.3 Book Edit Flow
1. Admin edits shared info via `PATCH /books/:id`
2. Papers managed separately via BookPaper API
3. Changes to papers do not affect book shared info

---

## Phase 7: Testing Checklist

- [ ] Create book without price/stock/ISBN — succeeds
- [ ] Book response includes `papers: []` and `priceRange: null`
- [ ] Create paper for book — succeeds
- [ ] Book response now includes `papers` array and `priceRange`
- [ ] Tree view shows `priceRange.display` instead of `price`
- [ ] Books table shows `priceRange.display` instead of Price/Stock/ISBN columns
- [ ] Book form does NOT send `isbn`, `price`, `discountPrice`, `stock`, `stockAmount`
- [ ] Book detail page shows papers list
- [ ] Can add multiple papers to a book
- [ ] Can edit a paper
- [ ] Can delete a paper
- [ ] Only one paper can be `isDefault` at a time
- [ ] `effectivePrice` and `isInStock` display correctly
- [ ] Discount date logic works (if dates implemented in UI)

---

## File Change Summary

| File | Action | Description |
|------|--------|-------------|
| `lib/types/book.ts` | Modify | Remove fields from Book, add BookPaper/PriceRange types, update DTOs |
| `lib/api/books.ts` | Modify | Add BookPaper API methods |
| `lib/hooks/use-books.ts` | Modify | Add BookPaper React Query hooks |
| `constants/query-key.ts` | Modify | Add bookPapers query keys |
| `components/books/book-form.tsx` | Modify | Remove pricing/stock/ISBN fields |
| `components/books/books-table.tsx` | Modify | Replace ISBN/Price/Stock with priceRange |
| `components/books/books-tree-view.tsx` | Modify | Use priceRange.display |
| `app/admin/books/[id]/page.tsx` | Modify | Add papers section, remove stale fields |
| `components/books/book-papers-manager.tsx` | **Create** | Paper list and management UI |
| `components/books/book-paper-form.tsx` | **Create** | Paper create/edit form |
| `components/books/book-paper-dialog.tsx` | **Create** | Dialog wrapper for paper form |
| `components/books/book.actions.tsx` | Modify | Add paper management action |

---

## Estimated Complexity

- **Type definitions:** Low (straightforward removals and additions)
- **API layer:** Low (new CRUD methods, standard pattern)
- **Hooks:** Low (standard React Query patterns)
- **Book form:** Low (field removals)
- **Table/Tree views:** Low (column/display updates)
- **Book detail page:** Medium (new papers section)
- **New paper components:** Medium-High (new form, dialog, manager)
- **Testing:** Medium

**Total estimated effort:** ~4-6 hours for a senior developer familiar with the codebase.
