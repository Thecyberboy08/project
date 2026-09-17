import Link from "next/link";
import {
  Eye,
  Shield,
  FileText,
  Globe,
  Image,
  Video,
  Headphones,
  ArrowRight,
  Search,
  Layers,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

const contentTypes = [
  {
    icon: FileText,
    title: "Text Verification",
    description: "Analyze claims, messages, and articles for credibility signals.",
  },
  {
    icon: Globe,
    title: "URL Analysis",
    description: "Verify domains, check source history, and assess page content.",
  },
  {
    icon: Image,
    title: "Image Analysis",
    description: "Detect manipulation, deepfakes, and synthetic imagery.",
  },
  {
    icon: Video,
    title: "Video Analysis",
    description: "Identify deepfakes, spliced content, and visual anomalies.",
  },
  {
    icon: Headphones,
    title: "Audio Analysis",
    description: "Detect voice cloning, audio manipulation, and synthetic speech.",
  },
];

const features = [
  {
    icon: Search,
    title: "Claim Breakdown",
    description:
      "Automatically extract and evaluate individual claims from submitted content.",
  },
  {
    icon: Layers,
    title: "Evidence Explorer",
    description:
      "See supporting, contradicting, and related evidence from multiple sources.",
  },
  {
    icon: BarChart3,
    title: "Explainable AI",
    description:
      "Understand why TruthLens reached its conclusion with transparent scoring.",
  },
  {
    icon: Shield,
    title: "Manipulation Detection",
    description:
      "Identify indicators of deepfakes, synthetic media, and content tampering.",
  },
];

const steps = [
  { step: "1", label: "Submit", description: "Paste text, upload media, or share a URL" },
  { step: "2", label: "Analyze", description: "AI extracts claims and checks sources" },
  { step: "3", label: "Verify", description: "Cross-reference evidence across sources" },
  { step: "4", label: "Score", description: "Calculate transparent trust assessment" },
  { step: "5", label: "Explain", description: "Review evidence and reasoning" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 border-primary/20 bg-primary/5 text-primary">
              <Eye className="mr-1.5 h-3 w-3" />
              AI-Powered Verification
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              See it.{" "}
              <span className="text-gradient">Verify it.</span>{" "}
              Trust it.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              AI-powered verification for the digital world. Analyze suspicious text, URLs,
              images, audio, and video — get evidence-backed trust assessments in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/verify"
                className={buttonVariants({ size: "lg", className: "px-8" })}
              >
                Verify Content
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/verify?type=text&demo=true"
                className={buttonVariants({ variant: "outline", size: "lg", className: "px-8" })}
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              How TruthLens Works
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A transparent, evidence-based approach to content verification.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-3">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-1">{step.label}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block h-4 w-4 text-muted-foreground/30 mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Types */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Multi-Modal Analysis
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            One platform for verifying all types of digital content.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentTypes.map((type) => (
            <div
              key={type.title}
              className="group rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-primary/30 hover:bg-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-4 transition-colors group-hover:bg-primary/15">
                <type.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{type.title}</h3>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Don&apos;t just get a verdict. Get the evidence.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            TruthLens goes beyond simple true/false labels. Understand the reasoning
            behind every assessment.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-primary/30 hover:bg-card"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Ready to verify?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Upload content, paste a claim, or share a URL. TruthLens will analyze
              it and show you the evidence.
            </p>
            <Link
              href="/verify"
              className={buttonVariants({ size: "lg", className: "px-8" })}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">TruthLens</span>
            </div>
            <p className="text-xs text-muted-foreground">
              AI-powered verification platform. Results are assessments, not absolute
              truth.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
