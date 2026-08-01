import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { categoryLabels, categoryStyles } from "../../utils/category";
import type { PopularSearchItem } from "../../types";

interface PopularSearchCardProps {
  item: PopularSearchItem;
  index?: number;
}

export function PopularSearchCard({
  item,
  index = 0,
}: PopularSearchCardProps) {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() =>
        navigate(`/search?q=${encodeURIComponent(item.code)}`)
      }
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      className="group flex flex-col items-start rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-left shadow-sm transition-colors hover:border-neutral-700 hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <span
        className={`mb-3 rounded-full px-2.5 py-1 text-[11px] font-medium ${
          categoryStyles[item.category]
        }`}
      >
        {categoryLabels[item.category]}
      </span>

      <code className="break-all text-sm font-semibold text-neutral-50">
        {item.code}
      </code>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-400">
        {item.description}
      </p>
    </motion.button>
  );
}