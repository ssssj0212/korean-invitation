import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = HTMLAttributes<HTMLElement> & {
  id: string;
};

export function SectionShell({ id, className, ...props }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("section-card soft-grain px-4 py-8 sm:px-5 sm:py-10", className)}
      {...props}
    />
  );
}
