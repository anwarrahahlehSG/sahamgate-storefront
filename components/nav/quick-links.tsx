import { cn } from "cn";
import { ChevronDown } from "lucide-react";

import type { MenuItem } from "@/lib/menu/types";

import { MenuLink } from "./menu-link";

const MAX_COLUMNS = 5;

export function QuickLinks({ items }: { items: MenuItem[] }) {
  return (
    <ul className="hidden md:flex items-center gap-5">
      {items.map((item) => (
        <NavItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

const TRIGGER_CLASS = "flex items-center gap-1 text-sm hover:opacity-70 transition-opacity";

function NavItem({ item }: { item: MenuItem }) {
  if (item.items.length === 0) {
    return (
      <li className="flex items-center h-16">
        <MenuLink url={item.url} className={TRIGGER_CLASS}>
          {item.title}
        </MenuLink>
      </li>
    );
  }

  const columns = item.items.slice(0, MAX_COLUMNS);

  return (
    <li className="group flex items-center h-16">
      <MenuLink url={item.url} className={TRIGGER_CLASS}>
        {item.title}
        <ChevronDown className="size-3" aria-hidden="true" />
      </MenuLink>
      <div
        className={cn(
          "absolute inset-x-0 top-full z-40",
          "invisible -translate-y-2 opacity-0",
          // Hover intent: opening waits 150ms so passing the pointer over the bar doesn't flash menus.
          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150",
          // :focus-visible (not :focus-within) so post-click mouse focus doesn't pin the menu open.
          "group-has-[:focus-visible]:visible group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100",
          "transition-[opacity,translate,visibility] duration-(--brand-duration-base) ease-brand",
          "bg-background border-b shadow-md",
        )}
      >
        <div className="mx-auto max-w-384 px-5 pt-6 pb-8 lg:px-10">
          <div className="grid grid-cols-5 gap-5">
            {columns.map((column) => (
              <div key={column.id}>
                {column.url ? (
                  <MenuLink
                    url={column.url}
                    className="block text-sm font-semibold mb-3 hover:opacity-70 transition-opacity"
                  >
                    {column.title}
                  </MenuLink>
                ) : (
                  <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {column.title}
                  </h3>
                )}
                {column.items.length > 0 && (
                  <ul className="space-y-2">
                    {column.items.map((leaf) => (
                      <li key={leaf.id}>
                        <MenuLink
                          url={leaf.url}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {leaf.title}
                        </MenuLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
