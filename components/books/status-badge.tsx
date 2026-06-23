import { Badge } from "@/components/ui/badge";

type Status = "PUBLISHED" | "DRAFT" | "ARCHIVED";

export function StatusBadge({ status }: { status: Status }) {
  switch (status) {
    case "PUBLISHED":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Published
        </Badge>
      );

    case "DRAFT":
      return <Badge variant="secondary">Draft</Badge>;

    default:
      return <Badge variant="destructive">Archived</Badge>;
  }
}
