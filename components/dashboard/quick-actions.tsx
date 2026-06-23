import Link from "next/link";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild>
        <Link href="/books/new">Add Book</Link>
      </Button>

      <Button variant="outline" asChild>
        <Link href="/users">Manage Users</Link>
      </Button>

      <Button variant="outline" asChild>
        <Link href="/orders">View Orders</Link>
      </Button>
    </div>
  );
}
