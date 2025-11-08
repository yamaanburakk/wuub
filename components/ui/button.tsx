"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-5 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-wuub-orange text-wuub-white shadow-glow hover:bg-wuub-orange/80",
        secondary:
          "border-wuub-black/10 bg-wuub-white text-wuub-black hover:bg-wuub-black/5 dark:border-wuub-white/20 dark:bg-transparent dark:text-wuub-white dark:hover:bg-wuub-white/10",
        ghost:
          "border-transparent bg-transparent text-wuub-black hover:bg-wuub-black/5 dark:text-wuub-white dark:hover:bg-wuub-white/10",
        outline:
          "border-wuub-black/20 bg-transparent text-wuub-black hover:bg-wuub-white/60 dark:border-wuub-white/25 dark:text-wuub-white dark:hover:bg-wuub-white/10",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

