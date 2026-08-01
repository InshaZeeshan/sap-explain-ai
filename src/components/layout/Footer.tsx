import { Sparkles } from "lucide-react";
import { Container } from "../common/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800/80">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          </span>

          <span className="text-sm font-medium text-neutral-300">
            SAP Explain AI
          </span>
        </div>

        <p className="text-center text-xs text-neutral-500 sm:text-right">
          A personal portfolio project exploring AI-assisted SAP tooling.
          <br className="hidden sm:block" />
          &copy; {year}. Built for learning, not affiliated with SAP SE.
        </p>
      </Container>
    </footer>
  );
}