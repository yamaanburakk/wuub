"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[160px] w-full rounded-2xl border border-wuub-black/15 bg-white px-4 py-3 text-base leading-relaxed text-wuub-black shadow-sm transition placeholder:text-wuub-gray/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 dark:border-wuub-white/20 dark:bg-wuub-black/30 dark:text-wuub-white",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };

