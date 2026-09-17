import { Badge } from "@/components/ui/badge";
import { getVerdictColor } from "@/lib/constants";
import type { Verdict } from "@/types";

interface VerdictBadgeProps {
  verdict: Verdict;
  className?: string;
}

export function VerdictBadge({ verdict, className }: VerdictBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`${getVerdictColor(verdict)} ${className || ""}`}
    >
      {verdict}
    </Badge>
  );
}
