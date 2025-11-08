"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl border border-wuub-black/15 bg-white px-4 text-base text-wuub-black shadow-sm transition placeholder:text-wuub-gray/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 dark:border-wuub-white/20 dark:bg-wuub-black/30 dark:text-wuub-white",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };

