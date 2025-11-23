import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown } from "lucide-react";
import type { User } from "@/lib/models.ts";

export const sortableHeader = (column: Column<User>, title: string) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
