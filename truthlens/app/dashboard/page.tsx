"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Eye,
} from "lucide-react";
import { getScoreColor, getVerdictColor } from "@/lib/constants";
import { format } from "date-fns";
import type { HistoryItem } from "@/types";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RISK_COLORS = {
  "High Risk": "#f87171",
  Uncertain: "#fb923c",
  Moderate: "#22d3ee",
  Trusted: "#34d399",
};

const TYPE_COLORS = ["#22d3ee", "#34d399", "#fb923c", "#a78bfa", "#f472b6"];

export default function DashboardPage() {
  const router = useRouter();
  const [analyses, setAnalyses] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((d) => {
        setAnalyses(d.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalAnalyses = analyses.length;
  const highRisk = analyses.filter((a) => a.riskLevel === "Critical" || a.riskLevel === "High").length;
  const avgScore =
    totalAnalyses > 0
      ? Math.round(analyses.reduce((s, a) => s + a.score, 0) / totalAnalyses)
      : 0;

  const riskDistribution = [
    { name: "Trusted", value: analyses.filter((a) => a.score >= 80).length },
    { name: "Moderate", value: analyses.filter((a) => a.score >= 60 && a.score < 80).length },
    { name: "Uncertain", value: analyses.filter((a) => a.score >= 40 && a.score < 60).length },
    { name: "High Risk", value: analyses.filter((a) => a.score < 40).length },
  ].filter((d) => d.value > 0);

  const typeDistribution = [
    { name: "Text", value: analyses.filter((a) => a.type === "text").length },
    { name: "URL", value: analyses.filter((a) => a.type === "url").length },
    { name: "Image", value: analyses.filter((a) => a.type === "image").length },
    { name: "Video", value: analyses.filter((a) => a.type === "video").length },
    { name: "Audio", value: analyses.filter((a) => a.type === "audio").length },
  ].filter((d) => d.value > 0);

  const stats = [
    {
      icon: BarChart3,
      label: "Total Analyses",
      value: totalAnalyses,
      color: "text-cyan-400",
    },
    {
      icon: AlertTriangle,
      label: "High Risk Detected",
      value: highRisk,
      color: "text-red-400",
    },
    {
      icon: TrendingUp,
      label: "Average Trust Score",
      value: avgScore,
      color: "text-emerald-400",
    },
    {
      icon: Eye,
      label: "Sources Analyzed",
      value: totalAnalyses * 3,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your verification activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Risk Distribution */}
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold mb-4">Risk Distribution</h3>
            {riskDistribution.length > 0 ? (
              <div className="flex items-center gap-6">
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, i) => (
                          <Cell
                            key={entry.name}
                            fill={RISK_COLORS[entry.name as keyof typeof RISK_COLORS] || TYPE_COLORS[i]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {riskDistribution.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              RISK_COLORS[d.name as keyof typeof RISK_COLORS] || TYPE_COLORS[i],
                          }}
                        />
                        <span className="text-xs">{d.name}</span>
                      </div>
                      <span className="text-xs font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-8">
                No data yet. Run some analyses first.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Content Types */}
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold mb-4">Content Types</h3>
            {typeDistribution.length > 0 ? (
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={typeDistribution}>
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
                      {typeDistribution.map((_, i) => (
                        <Cell key={i} fill={TYPE_COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-8">
                No data yet. Run some analyses first.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Analyses */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Recent Analyses</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/history")}
              className="gap-1 text-xs"
            >
              View All
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-lg bg-muted/30 animate-pulse" />
              ))}
            </div>
          ) : analyses.length > 0 ? (
            <div className="space-y-2">
              {analyses.slice(0, 5).map((a) => (
                <button
                  key={a.id}
                  onClick={() => router.push(`/results/${a.id}`)}
                  className="w-full flex items-center justify-between rounded-lg bg-background/30 hover:bg-muted/30 p-3 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-xs font-medium truncate">{a.input}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {a.type.toUpperCase()}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {format(new Date(a.createdAt), "MMM d, h:mm a")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-sm font-bold ${getScoreColor(a.score)}`}>
                      {a.score}
                    </span>
                    <Badge
                      variant="outline"
                      className={`${getVerdictColor(a.verdict)} text-[10px] px-1.5 py-0 hidden sm:inline-flex`}
                    >
                      {a.verdict}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-3">
                No analyses yet
              </p>
              <Button size="sm" onClick={() => router.push("/verify")}>
                Start Verifying
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
