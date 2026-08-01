import { Search, ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  size?: "lg" | "md";
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search an error, T-Code, or concept…",
  size = "md",
  autoFocus = false,
  className,
}: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
      className={cn(
        "flex w-full items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/80 pl-4 pr-2 shadow-lg shadow-black/20 backdrop-blur transition-colors focus-within:border-blue-500/60",
        size === "lg" ? "py-2" : "py-1",
        className
      )}
    >
      <Search
        className="h-5 w-5 shrink-0 text-neutral-500"
        aria-hidden="true"
      />

      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search SAP errors, T-Codes, and concepts"
        className={cn(
          "w-full bg-transparent text-neutral-100 placeholder:text-neutral-500 focus:outline-none",
          size === "lg" ? "py-3 text-base sm:text-lg" : "py-2 text-sm"
        )}
      />

      <button
        type="submit"
        aria-label="Search"
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
          size === "lg" ? "h-11 w-11" : "h-9 w-9"
        )}
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}