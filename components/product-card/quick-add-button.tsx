"use client";

import { cn } from "cn";
import { Check, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { useCartDrawer } from "@/components/cart/context";
import { useCartForm } from "@/lib/cart/client";

interface QuickAddButtonProps {
  className?: string;
  label: string;
  merchandiseId: string;
}

const CONFIRM_MS = 1600;

// Same Hydrogen cart form as the product page, so the line appears optimistically and the drawer
// opens on the add; no Server Action is involved.
export function QuickAddButton({ className, label, merchandiseId }: QuickAddButtonProps) {
  const { formProps, register } = useCartForm();
  const { openOverlay } = useCartDrawer();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), CONFIRM_MS);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  return (
    <form
      {...formProps({
        beforeSubmit: () => {
          setJustAdded(true);
          openOverlay();
        },
      })}
      className={className}
    >
      <input type="hidden" {...register("merchandiseId", { value: merchandiseId })} />
      <input type="hidden" {...register("quantity", { value: 1 })} />
      <button
        {...register("add")}
        aria-label={label}
        type="submit"
        className={cn(
          "flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-[background-color,color,transform] duration-(--brand-duration-quick) ease-brand hover:bg-foreground hover:text-background active:scale-95",
          justAdded && "bg-primary text-primary-foreground",
        )}
      >
        {justAdded ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Plus className="size-4" aria-hidden="true" />
        )}
      </button>
    </form>
  );
}
