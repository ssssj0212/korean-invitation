"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type SectionShellProps = HTMLMotionProps<"section"> & {
  id: string;
};

export function SectionShell({ id, className, ...props }: SectionShellProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className={cn("section-card soft-grain px-4 py-8 sm:px-5 sm:py-10", className)}
      {...props}
    />
  );
}
