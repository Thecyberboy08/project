import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 mx-auto mb-4">
        <Eye className="h-6 w-6 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className={buttonVariants()}>
        Back to Home
      </Link>
    </div>
  );
}
