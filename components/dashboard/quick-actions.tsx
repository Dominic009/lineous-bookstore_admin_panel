import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Users, ShoppingCart } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild>
        <Link href="/books/new" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Book
        </Link>
      </Button>

      <Button variant="outline" asChild className="gap-2">
        <Link href="/users">
          <Users className="h-4 w-4" />
          Manage Users
        </Link>
      </Button>

      <Button variant="outline" asChild className="gap-2">
        <Link href="/orders">
          <ShoppingCart className="h-4 w-4" />
          View Orders
        </Link>
      </Button>
    </div>
  );
}
