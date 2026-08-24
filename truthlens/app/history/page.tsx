"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, ArrowUpDown, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getScoreColor, getVerdictColor, CONTENT_TYPE_LABELS } from "@/lib/constants";
import { format } from "date-fns";
import type { HistoryItem, ContentType } from "@/types";

export default function HistoryPage() {
  const router = useRouter();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [sort, setSort] = useState("date");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (typeFilter !== "all") params.set("type", typeFilter);
    if (riskFilter !== "all") params.set("risk", riskFilter);
    params.set("sort", sort);

    fetch(`/api/history?${params}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        if (!controller.signal.aborted) {
          setItems(d.items || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [search, typeFilter, riskFilter, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Verification History</h1>
        <p className="text-sm text-muted-foreground">
          Browse and search your previous analyses
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search analyses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background/50 border-border/50"
          />
        </div>
        <Select value={typeFilter} onValueChange={(v) => v !== null && setTypeFilter(v)}>
          <SelectTrigger className="w-full sm:w-[150px] bg-background/50 border-border/50">
            <Filter className="h-3.5 w-3.5 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {(Object.keys(CONTENT_TYPE_LABELS) as ContentType[]).map((t) => (
              <SelectItem key={t} value={t}>
                {CONTENT_TYPE_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={riskFilter} onValueChange={(v) => v !== null && setRiskFilter(v)}>
          <SelectTrigger className="w-full sm:w-[150px] bg-background/50 border-border/50">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSort(sort === "date" ? "score" : "date")}
          className="gap-1.5"
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          {sort === "date" ? "By Date" : "By Score"}
        </Button>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(`/results/${item.id}`)}
              className="w-full flex items-center justify-between rounded-xl border border-border/30 bg-card/30 hover:bg-card/60 p-4 transition-all text-left"
            >
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium truncate mb-1">{item.input}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {CONTENT_TYPE_LABELS[item.type]}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${getVerdictColor(item.verdict)} text-[10px] px-1.5 py-0`}
                  >
                    {item.verdict}
                  </Badge>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {format(new Date(item.createdAt), "MMM d, yyyy h:mm a")}
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                  {item.score}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {item.confidence}% confidence
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-xl border border-border/30 bg-card/30">
          <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium mb-1">No analyses found</p>
          <p className="text-xs text-muted-foreground mb-4">
            {search || typeFilter !== "all" || riskFilter !== "all"
              ? "Try adjusting your filters"
              : "Start verifying content to see your history"}
          </p>
          <Button size="sm" onClick={() => router.push("/verify")}>
            Verify Content
          </Button>
        </div>
      )}
    </div>
  );
}
