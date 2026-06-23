import { Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BooksTable } from "@/components/books/books-table";

export default function BooksPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Books</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your bookstore inventory.
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            className="h-10 rounded-xl border-border/60 bg-muted/30 pl-10 pr-4"
          />
        </div>

        <Button variant="outline" className="gap-2 rounded-xl">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <BooksTable />
    </div>
  );
}
