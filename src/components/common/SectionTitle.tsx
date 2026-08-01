import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-blue-400">
          {eyebrow}
        </span>
      )}

      <h2 className="text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-neutral-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}