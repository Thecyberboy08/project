import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import type { TimelineEvent } from "@/types";

interface EvidenceTimelineProps {
  timeline: TimelineEvent[];
}

export function EvidenceTimeline({ timeline }: EvidenceTimelineProps) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-semibold">Evidence Timeline</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          How information about this content evolved over time
        </p>

        <div className="relative ml-2">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50" />

          <div className="space-y-4">
            {timeline.map((event, i) => (
              <div key={i} className="relative flex items-start gap-4 pl-4">
                <div
                  className={`absolute left-0 top-1.5 w-2 h-2 rounded-full border-2 -translate-x-[calc(50%+0.5px)] ${
                    i === timeline.length - 1
                      ? "bg-primary border-primary"
                      : "bg-background border-border/50"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-xs font-medium">{event.event}</p>
                  {event.source && (
                    <p className="text-[10px] text-muted-foreground">
                      {event.source}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
