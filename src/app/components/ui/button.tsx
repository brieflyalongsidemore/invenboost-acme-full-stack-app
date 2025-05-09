import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary [&>div]:text-primary-foreground text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive [&>div]:text-primary-foreground text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input [&>div]:text-accent-foreground bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary [&>div]:text-secondary-foreground text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent [&>div]:text-accent-foreground  hover:text-accent-foreground",
        link: "text-primary [&>div]:text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, children, loading, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        disabled={loading}
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "relative select-none text-transparent",
        )}
        {...props}
      >
        {loading && (
          <div className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
