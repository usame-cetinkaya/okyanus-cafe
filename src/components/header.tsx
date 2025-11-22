import { pb } from "@/lib/pocketbase";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { CircleUser, Menu } from "lucide-react";
import { firstPathname, navItems } from "@/lib/nav.ts";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  const isSuperuser = pb.authStore.isSuperuser;

  const title = isSuperuser
    ? navItems.find((item) => item.pathname === firstPathname())?.title
    : "Okyanus Cafe";

  const handleLogout = () => {
    pb.authStore.clear();
    window.location.href = "/";
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4">
      {isSuperuser && (
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      <h1 className="text-xl">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full ml-auto"
          >
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{pb.authStore?.record?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Çıkış Yap</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
