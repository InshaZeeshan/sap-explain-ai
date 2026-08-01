import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

import { Container } from "../components/common/Container";
import { Button } from "../components/common/Button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
        404 Error
      </p>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-50 sm:text-5xl">
        Page not found
      </h1>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <div className="mt-8">
        <Button
          icon={Home}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;