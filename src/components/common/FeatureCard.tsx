import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-sm transition-colors hover:border-neutral-700 hover:bg-neutral-900"
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/15">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <h3 className="text-lg font-semibold text-neutral-50">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
        {description}
      </p>
    </motion.div>
  );
}