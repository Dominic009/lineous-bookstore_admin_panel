import { Badge } from "@/components/ui/badge";

type Status = "PUBLISHED" | "DRAFT" | "ARCHIVED";

export function StatusBadge({ status }: { status: Status }) {
  switch (status) {
    case "PUBLISHED":
      return (
        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400">
          Published
        </Badge>
      );

    case "DRAFT":
      return (
        <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-950 dark:text-amber-400">
          Draft
        </Badge>
      );

    default:
      return (
        <Badge variant="destructive" className="bg-rose-50 text-rose-700 hover:bg-rose-50 dark:bg-rose-950 dark:text-rose-400">
          Archived
        </Badge>
      );
  }
}
