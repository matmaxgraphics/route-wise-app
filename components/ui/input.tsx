import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-[rgb(var(--primary))] selection:text-[rgb(var(--on-primary))] bg-[rgb(var(--surface-container-lowest))] border-[rgb(var(--outline))] h-11 w-full min-w-0 rounded-2xl px-4 py-3 text-base shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-[color,box-shadow,background] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[rgb(var(--primary))] focus-visible:ring-[3px] focus-visible:ring-[rgba(0,107,63,0.16)]",
        "aria-invalid:ring-[rgba(186,26,26,0.2)] dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
