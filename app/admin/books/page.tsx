import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BooksTable } from "@/components/books/books-table";

export default function BooksPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Books</h1>

          <p className="mt-2 text-muted-foreground">
            Manage your bookstore inventory.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input className="pl-10" placeholder="Search books..." />
        </div>
      </div>

      <BooksTable />
    </div>
  );
}
