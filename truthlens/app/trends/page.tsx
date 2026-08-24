"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { getRiskLevelColor } from "@/lib/constants";
import { format } from "date-fns";
import type { TrendingClaim } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const DIRECTION_ICONS = {
  rising: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
};

const DIRECTION_COLORS = {
  rising: "text-red-400",
  stable: "text-muted-foreground",
  declining: "text-emerald-400",
};

const CHART_COLORS: Record<string, string> = {
  High: "#f87171",
  Medium: "#fb923c",
  Low: "#34d399",
  Critical: "#ef4444",
};

export default function TrendsPage() {
  const [trends, setTrends] = useState<TrendingClaim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trends")
      .then((r) => r.json())
      .then((d) => {
        setTrends(d.trends || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const riskDistribution = [
    {
      name: "High",
      value: trends.filter((t) => t.riskLevel === "High" || t.riskLevel === "Critical")
        .length,
    },
    {
      name: "Medium",
      value: trends.filter((t) => t.riskLevel === "Medium").length,
    },
    {
      name: "Low",
      value: trends.filter((t) => t.riskLevel === "Low").length,
    },
  ].filter((d) => d.value > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold tracking-tight">Misinformation Trends</h1>
          <Badge variant="secondary" className="border-amber-500/20 bg-amber-500/5 text-amber-400 text-[10px]">
            Demo Data
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Track trending claims and misinformation patterns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Stats */}
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold mb-4">Overview</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Trending Claims</span>
                <span className="text-sm font-bold">{trends.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total Reports</span>
                <span className="text-sm font-bold">
                  {trends.reduce((s, t) => s + t.reports, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Rising Trends</span>
                <span className="text-sm font-bold text-red-400">
                  {trends.filter((t) => t.direction === "rising").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution Chart */}
        <Card className="border-border/50 bg-card/50 lg:col-span-2">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold mb-4">Risk Distribution</h3>
            {riskDistribution.length > 0 ? (
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(13,17,23,0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {riskDistribution.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={CHART_COLORS[entry.name] || "#22d3ee"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-8">No data</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trending Claims List */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold mb-4">Trending Claims</h3>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-lg bg-muted/30 animate-pulse" />
              ))}
            </div>
          ) : trends.length > 0 ? (
            <div className="space-y-3">
              {trends.map((trend) => {
                const DirIcon = DIRECTION_ICONS[trend.direction];
                return (
                  <div
                    key={trend.id}
                    className="rounded-lg border border-border/30 bg-background/30 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <DirIcon
                        className={`h-4 w-4 mt-0.5 shrink-0 ${DIRECTION_COLORS[trend.direction]}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium mb-1.5">{trend.claim}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className={`${getRiskLevelColor(trend.riskLevel)} text-[10px] px-1.5 py-0`}
                          >
                            {trend.riskLevel}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {trend.reports.toLocaleString()} reports
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            First: {format(new Date(trend.firstDetected), "MMM d")}
                          </span>
                        </div>
                        {trend.relatedSources.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="text-[10px] text-muted-foreground">Sources:</span>
                            {trend.relatedSources.slice(0, 3).map((src) => (
                              <span
                                key={src}
                                className="text-[10px] text-primary/70"
                              >
                                {src}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-8">
              No trending data available
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
