"use client";

import { getScoreColor } from "@/lib/constants";

interface TrustScoreProps {
  score: number;
  verdict: string;
}

export function TrustScore({ score, verdict }: TrustScoreProps) {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const strokeColor =
    score >= 80
      ? "rgb(52, 211, 153)"
      : score >= 60
      ? "rgb(34, 211, 238)"
      : score >= 40
      ? "rgb(251, 146, 60)"
      : "rgb(248, 113, 113)";

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-6 text-center">
      <div className="relative inline-flex items-center justify-center mb-4">
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-border/30"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${color}`}>{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <h3 className={`text-lg font-semibold ${color}`}>{verdict}</h3>
      <p className="text-xs text-muted-foreground mt-1">Trust Assessment Score</p>
    </div>
  );
}
