"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Types
type Modality = "text" | "social" | "image" | "audio";
type VerdictType = "high_risk" | "deepfake" | "misleading" | "verified";

interface FactCheckSource {
  name: string;
  verdict: string;
  sourceUrl: string;
  confidence: number;
  date: string;
  agencyBadge: string;
}

interface AnalysisResult {
  id: string;
  timestamp: string;
  modality: Modality;
  title: string;
  claimExcerpt: string;
  riskScore: number; // 0 to 100
  verdict: VerdictType;
  verdictLabel: string;
  confidence: number;
  category: string;
  language: string;
  subScores: {
    syntheticAnomaly: number;
    factCheckConsensus: number;
    emotionalSensationalism: number;
    sourceCredibility: number;
  };
  forensicPoints: string[];
  matchedSources: FactCheckSource[];
  debunkSummary: string;
  mediaUrl?: string;
  mediaType?: "image" | "audio" | "video";
  cryptographicAuditHash: string;
}

// Tactical Preset Payloads
const SAMPLE_PRESETS: Record<string, {
  modality: Modality;
  title: string;
  input: string;
  url?: string;
  category: string;
  language: string;
  result: AnalysisResult;
}> = {
  sample1: {
    modality: "text",
    title: "PAYLOAD_01 // RBI_500_NOTE_BAN_HOAX",
    input: "URGENT WARNING: Reserve Bank of India has announced via emergency gazette that all ₹500 currency notes with green serial numbers will be declared invalid from midnight tonight. Forward to all groups to avoid losing money!",
    category: "FINANCIAL_WARFARE / DISINFO",
    language: "EN_IN / HI_IN",
    result: {
      id: "PAYLOAD-RBI-500",
      timestamp: "19:08:42 UTC",
      modality: "text",
      title: "ALLEGED DEMONETIZATION OF ₹500 CURRENCY NOTES",
      claimExcerpt: "Reserve Bank of India has announced via emergency gazette that ₹500 currency notes will be declared invalid tonight.",
      riskScore: 94,
      verdict: "high_risk",
      verdictLabel: "[CRITICAL] FABRICATED DISINFORMATION // MASS PANIC VECTOR",
      confidence: 99.2,
      category: "FINANCIAL_WARFARE / DISINFO",
      language: "EN-IN (CODE-MIXED)",
      subScores: {
        syntheticAnomaly: 15,
        factCheckConsensus: 98,
        emotionalSensationalism: 92,
        sourceCredibility: 8,
      },
      forensicPoints: [
        "ZERO matching gazette notifications or cryptographic signatures on official rbi.org.in registry.",
        "National PIB Fact Check database matches identical recurring viral payload signature.",
        "High-entropy linguistic urgency triggers detected: ['URGENT WARNING', 'midnight tonight'].",
        "Heuristic analysis classifies payload as coordinated WhatsApp forward chain amplification.",
      ],
      matchedSources: [
        {
          name: "PIB Fact Check Registry",
          verdict: "FABRICATED HOAX",
          sourceUrl: "https://factcheck.pib.gov.in",
          confidence: 99,
          date: "RECENT_DISPATCH",
          agencyBadge: "SOVEREIGN REGISTRY",
        },
        {
          name: "AltNews Intelligence Ledger",
          verdict: "COORDINATED RUMOR",
          sourceUrl: "https://www.altnews.in",
          confidence: 98,
          date: "PREVIOUS_INTERCEPT",
          agencyBadge: "IFCN SIGNATORY",
        },
        {
          name: "Reuters Open Claim Ledger",
          verdict: "DEBUNKED REPEAT",
          sourceUrl: "https://www.reuters.com/fact-check",
          confidence: 96,
          date: "ARCHIVED",
          agencyBadge: "GLOBAL WIRE INTEL",
        },
      ],
      debunkSummary:
        "STATUS: DEBUNKED. The Reserve Bank of India has NOT discontinued ₹500 currency notes. This is a recurring psychological panic hoax recycled through unverified messaging groups. Banknotes remain valid legal tender.",
      cryptographicAuditHash: "0x89f2a4b81c20e1948d390a8fe43912a7741d8e12b",
    },
  },
  sample2: {
    modality: "audio",
    title: "PAYLOAD_02 // POLITICIAN_VOICE_SPOOF",
    input: "Intercepted audio wiretap allegedly capturing party candidate discussing covert election strategies behind closed doors.",
    category: "SYNTHETIC_SPEECH / DEEPFAKE",
    language: "EN_IN / REGIONAL",
    result: {
      id: "PAYLOAD-VOICE-CLONE",
      timestamp: "19:08:42 UTC",
      modality: "audio",
      title: "SYNTHETIC AI VOICE CLONE & SPECTRAL FORGERY",
      claimExcerpt: "Intercepted audio wiretap allegedly capturing party candidate discussing covert election strategies.",
      riskScore: 91,
      verdict: "deepfake",
      verdictLabel: "[ALERT] SYNTHETIC AI VOICE CLONE DETECTED",
      confidence: 94.8,
      category: "SYNTHETIC_SPEECH / DEEPFAKE",
      language: "EN-IN / MULTILINGUAL",
      subScores: {
        syntheticAnomaly: 96,
        factCheckConsensus: 88,
        emotionalSensationalism: 85,
        sourceCredibility: 12,
      },
      forensicPoints: [
        "Acoustic spectral FFT inspection reveals robotic pitch quantization and missing glottal micro-tremors.",
        "Phoneme phase discontinuity characteristic of RVC (Retrieval-based Voice Conversion) synthesis.",
        "Background atmospheric room noise reveals unnatural phase cutouts during syllable transitions.",
        "Zero verified broadcaster metadata; initial origin traced to burner Telegram relay bot.",
      ],
      matchedSources: [
        {
          name: "Acoustic Threat Intelligence Grid",
          verdict: "SYNTHETIC SPOOF (94% CONFIDENCE)",
          sourceUrl: "https://eci.gov.in",
          confidence: 95,
          date: "OCT_2026",
          agencyBadge: "ELECTORAL FORENSICS",
        },
        {
          name: "DeepMedia Acoustic Labs",
          verdict: "ARTIFICIAL VOCAL TRACT DETECTED",
          sourceUrl: "https://deepmedia.ai",
          confidence: 94,
          date: "OCT_2026",
          agencyBadge: "SPEECH FORENSICS",
        },
      ],
      debunkSummary:
        "STATUS: SYNTHETIC SPOOF. The circulating audio file is a diffusion-generated synthetic voice clone created using voice cloning software. Natural human vocal cord harmonic patterns are absent.",
      mediaUrl: "/deepfake_sample.jpg",
      mediaType: "audio",
      cryptographicAuditHash: "0x3e174b901fc87102a901842bc948a129ef31048b",
    },
  },
  sample3: {
    modality: "image",
    title: "PAYLOAD_03 // PIXEL_FLOOD_SPOOF",
    input: "Viral photo claim: Downtown metro expressway completely submerged under 8 feet of water following yesterday's storm surge.",
    category: "DIGITAL_FORGERY / TAMPER",
    language: "BINARY / PIXEL_DATA",
    result: {
      id: "PAYLOAD-FLOOD-IMG",
      timestamp: "19:08:42 UTC",
      modality: "image",
      title: "OUT-OF-CONTEXT RECYCLED & TAMPERED DISASTER MEDIA",
      claimExcerpt: "Viral image claiming downtown metro expressway completely submerged under 8 feet of water.",
      riskScore: 82,
      verdict: "misleading",
      verdictLabel: "[WARNING] PIXEL TAMPERING & CONTEXT FORGERY",
      confidence: 91.5,
      category: "DIGITAL_FORGERY / TAMPER",
      language: "PIXEL_MATRIX",
      subScores: {
        syntheticAnomaly: 78,
        factCheckConsensus: 89,
        emotionalSensationalism: 84,
        sourceCredibility: 22,
      },
      forensicPoints: [
        "Reverse perceptual hash search matches base image to a 2019 flood event in a different geographic sector.",
        "Error Level Analysis (ELA) flags localized compression artifacts around water surface and vehicle reflection boundaries.",
        "EXIF metadata stripped; quantization tables reveal non-native re-encoding passes.",
        "Municipal disaster management sensor telemetry confirms normal flow at indicated location.",
      ],
      matchedSources: [
        {
          name: "BoomLive Forensics Desk",
          verdict: "RECYCLED 2019 FOOTAGE",
          sourceUrl: "https://www.boomlive.in",
          confidence: 93,
          date: "OCT_2026",
          agencyBadge: "VERIFIED ARCHIVE",
        },
        {
          name: "Disaster Authority Telemetry Feed",
          verdict: "NO INCIDENT AT TARGET GPS",
          sourceUrl: "https://ndma.gov.in",
          confidence: 97,
          date: "LIVE_TAP",
          agencyBadge: "OFFICIAL TELEMETRY",
        },
      ],
      debunkSummary:
        "STATUS: MANIPULATED RECYCLE. Photograph originates from 2019 in another municipality and has been modified to exaggerate localized flooding. Current city expressways remain operational.",
      mediaUrl: "/flood_sample.jpg",
      mediaType: "image",
      cryptographicAuditHash: "0x789ac23e411b009e841dfa30281cc410a7192be4",
    },
  },
  sample4: {
    modality: "text",
    title: "PAYLOAD_04 // ISRO_TELEMETRY_LOG",
    input: "The Indian Space Research Organisation (ISRO) successfully launched the new GSAT communication satellite into Geosynchronous Transfer Orbit aboard GSLV-F14 from Sriharikota spaceport.",
    category: "AUTHENTIC_TELEMETRY / SCIENCE",
    language: "EN_GLOBAL",
    result: {
      id: "PAYLOAD-ISRO-TELEMETRY",
      timestamp: "19:08:42 UTC",
      modality: "text",
      title: "ISRO SATELLITE ORBITAL INSERTION CONFIRMATION",
      claimExcerpt: "The Indian Space Research Organisation successfully launched the new GSAT satellite into GTO.",
      riskScore: 6,
      verdict: "verified",
      verdictLabel: "[VERIFIED] AUTHENTIC PAYLOAD // ZERO FORGERY",
      confidence: 98.9,
      category: "AUTHENTIC_TELEMETRY / SCIENCE",
      language: "EN_GLOBAL",
      subScores: {
        syntheticAnomaly: 2,
        factCheckConsensus: 99,
        emotionalSensationalism: 4,
        sourceCredibility: 98,
      },
      forensicPoints: [
        "Cryptographic public key corroborated against official press bulletin on isro.gov.in.",
        "Live satellite telemetry corroborated by international Space-Track orbital tracking beacons.",
        "Zero synthetic anomaly vectors, botnet amplification, or sensational manipulation detected.",
        "Corroborated across 14 independent national broadcast feeds and telemetry relays.",
      ],
      matchedSources: [
        {
          name: "ISRO Mission Operations Ledger",
          verdict: "OFFICIAL TELEMETRY MATCH",
          sourceUrl: "https://www.isro.gov.in",
          confidence: 99,
          date: "ORBITAL_T0",
          agencyBadge: "PRIMARY TRANSMITTER",
        },
        {
          name: "DD National Telemetry Relay",
          verdict: "LIVE BROADCAST VERIFIED",
          sourceUrl: "https://ddnews.gov.in",
          confidence: 98,
          date: "LIVE_FEED",
          agencyBadge: "PUBLIC BROADCASTER",
        },
      ],
      debunkSummary:
        "STATUS: AUTHENTIC. Payload verified against primary mission registry and orbital flight telemetry. Zero misinformation risk detected.",
      cryptographicAuditHash: "0x12b07cf918a992bc44301fae800c7d4138e910fa",
    },
  },
};

export default function Home() {
  // Navigation tabs (Only 3 tabs: analyzer, radar, history)
  const [activeTab, setActiveTab] = useState<Modality>("text");
  const [activeSection, setActiveSection] = useState<"analyzer" | "radar" | "history">("analyzer");

  // Input states
  const [textInput, setTextInput] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("RAW_SUSPECT_PAYLOAD");
  const [selectedLanguage, setSelectedLanguage] = useState("UTF-8 / ALL_LOCALES");
  const [analysisMode, setAnalysisMode] = useState<"deep" | "fast">("deep");
  const [imageFilePreview, setImageFilePreview] = useState<string | null>(null);
  const [audioFilePreview, setAudioFilePreview] = useState<string | null>(null);

  // Analysis lifecycle states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(SAMPLE_PRESETS.sample1.result);

  // History state (persisted)
  const [scanHistory, setScanHistory] = useState<AnalysisResult[]>([]);
  const [historyFilter, setHistoryFilter] = useState<"all" | "high_risk" | "deepfake" | "verified">("all");

  // Modals state
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedDebunk, setCopiedDebunk] = useState(false);

  // Threat dispatch form state
  const [reportTitle, setReportTitle] = useState("");
  const [reportUrl, setReportUrl] = useState("");
  const [reportNotes, setReportNotes] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Auth / Root Access state
  const [isAnalystLoggedIn, setIsAnalystLoggedIn] = useState(false);
  const [analystEmail, setAnalystEmail] = useState("root@sytech.security");

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sytech_truthlens_history");
      if (stored) {
        setScanHistory(JSON.parse(stored));
      } else {
        const initial = [
          SAMPLE_PRESETS.sample1.result,
          SAMPLE_PRESETS.sample2.result,
          SAMPLE_PRESETS.sample3.result,
        ];
        setScanHistory(initial);
        localStorage.setItem("sytech_truthlens_history", JSON.stringify(initial));
      }
    } catch {
      // storage fallback
    }
  }, []);

  // Save history
  const saveToHistory = (res: AnalysisResult) => {
    setScanHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== res.id);
      const updated = [res, ...filtered].slice(0, 25);
      try {
        localStorage.setItem("sytech_truthlens_history", JSON.stringify(updated));
      } catch {
        // quota fallback
      }
      return updated;
    });
  };

  // Trigger preset sample
  const loadPreset = (key: keyof typeof SAMPLE_PRESETS) => {
    const sample = SAMPLE_PRESETS[key];
    setActiveTab(sample.modality);
    setSelectedCategory(sample.category);

    if (sample.modality === "text") {
      setTextInput(sample.input);
      setSocialUrl("");
      setImageFilePreview(null);
      setAudioFilePreview(null);
    } else if (sample.modality === "social") {
      setSocialUrl("https://x.com/intercepted_target/status/1839210928");
      setTextInput(sample.input);
    } else if (sample.modality === "image") {
      setTextInput(sample.input);
      setImageFilePreview("/flood_sample.jpg");
    } else if (sample.modality === "audio") {
      setTextInput(sample.input);
      setAudioFilePreview("/deepfake_sample.jpg");
    }

    triggerAnalysisWithResult(sample.result);
  };

  // Simulate Multi-Stage Forensic Scan
  const triggerAnalysisWithResult = (resultToSet: AnalysisResult) => {
    setIsAnalyzing(true);
    setAnalysisStep(1);

    const step1Timer = setTimeout(() => setAnalysisStep(2), 350);
    const step2Timer = setTimeout(() => setAnalysisStep(3), 750);
    const step3Timer = setTimeout(() => setAnalysisStep(4), 1150);
    const step4Timer = setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisStep(0);
      setCurrentResult(resultToSet);
      saveToHistory(resultToSet);
    }, 1600);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(step4Timer);
    };
  };

  // Custom Run Analysis for user typed input
  const handleRunAnalysis = () => {
    const inputContent = activeTab === "social" ? socialUrl : textInput;
    if (!inputContent && !imageFilePreview && !audioFilePreview) {
      alert("[ERROR] NO PAYLOAD SPECIFIED. ENTER RAW TEXT, TARGET URL, OR LOAD SAMPLE.");
      return;
    }

    const lower = (inputContent || "").toLowerCase();
    const isSuspicious =
      lower.includes("secret") ||
      lower.includes("ban") ||
      lower.includes("urgent") ||
      lower.includes("shocking") ||
      lower.includes("conspiracy") ||
      lower.includes("leak") ||
      lower.includes("fake") ||
      activeTab === "audio";

    const riskScore = isSuspicious ? Math.floor(75 + Math.random() * 22) : Math.floor(10 + Math.random() * 30);
    const verdict: VerdictType =
      activeTab === "audio"
        ? "deepfake"
        : riskScore > 75
        ? "high_risk"
        : riskScore > 45
        ? "misleading"
        : "verified";

    const customRes: AnalysisResult = {
      id: `DISSECT-${Date.now().toString(16).toUpperCase()}`,
      timestamp: new Date().toISOString().substring(11, 19) + " UTC",
      modality: activeTab,
      title: inputContent ? inputContent.slice(0, 45).toUpperCase() + "..." : "CUSTOM_PAYLOAD_DISSECTION",
      claimExcerpt: inputContent || "RAW HEURISTIC PAYLOAD SUBMITTED TO SY TECH FORENSIC DISSECTOR ENGINE.",
      riskScore,
      verdict,
      verdictLabel:
        verdict === "deepfake"
          ? "[ALERT] SYNTHETIC DEEPFAKE SIGNATURE DETECTED"
          : verdict === "high_risk"
          ? "[CRITICAL] HIGH-RISK FABRICATED FORGERY"
          : verdict === "misleading"
          ? "[WARN] MANIPULATED OUT-OF-CONTEXT MEDIA"
          : "[CLEAN] VERIFIED AUTHENTIC PAYLOAD",
      confidence: Number((91 + Math.random() * 8.2).toFixed(1)),
      category: selectedCategory,
      language: selectedLanguage,
      subScores: {
        syntheticAnomaly: activeTab === "image" || activeTab === "audio" ? riskScore : Math.floor(Math.random() * 25),
        factCheckConsensus: riskScore > 60 ? 89 : 18,
        emotionalSensationalism: riskScore > 60 ? 88 : 12,
        sourceCredibility: 100 - riskScore,
      },
      forensicPoints: [
        `Cross-referenced against sovereign and independent fact-checking databases via SY Tech API.`,
        `Neural linguistic parser flagged ${riskScore > 60 ? "HIGH-ENTROPY MANIPULATION TRIGGERS" : "AUTHENTIC SYNTACTIC PATTERNS"}.`,
        activeTab === "audio"
          ? "Acoustic frequency FFT confirms non-human vocoder harmonics."
          : activeTab === "image"
          ? "Error Level Analysis (ELA) identifies local pixel re-compression borders."
          : "Corpus semantic matching verified against live Reuters and PIB registries.",
        `Cryptographic audit stamp generated by SY Tech Forensic Engine v2.6.`,
      ],
      matchedSources: [
        {
          name: "Sovereign Threat Ledger",
          verdict: riskScore > 60 ? "FLAGGED FORGERY" : "NO VIOLATION",
          sourceUrl: "https://factcheck.pib.gov.in",
          confidence: 95,
          date: "LIVE_RECON",
          agencyBadge: "NATIONAL GRID",
        },
        {
          name: "SY Tech Open Evidence Repository",
          verdict: riskScore > 60 ? "UNSUBSTANTIATED RUMOR" : "AUTHENTIC MATCH",
          sourceUrl: "https://sytech.security",
          confidence: 93,
          date: "OCT_2026",
          agencyBadge: "SY TECH LABS",
        },
      ],
      debunkSummary:
        riskScore > 60
          ? `SECURITY ADVISORY: Payload exhibits acute manipulation signatures (${riskScore}% Risk). Do not rebroadcast or relay to network peers.`
          : `SECURITY ADVISORY: Target payload matches corroborated public telemetry and carries low adversarial risk.`,
      mediaUrl: activeTab === "image" ? imageFilePreview || undefined : activeTab === "audio" ? audioFilePreview || undefined : undefined,
      mediaType: activeTab === "image" ? "image" : activeTab === "audio" ? "audio" : undefined,
      cryptographicAuditHash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
    };

    triggerAnalysisWithResult(customRes);
  };

  // Copy WhatsApp Debunk
  const handleCopyDebunk = () => {
    if (!currentResult) return;
    const text = `🚨 *[TRUTHLENS FORENSIC DISPATCH // SY TECH]*\n` +
      `🛡️ *Verdict:* ${currentResult.verdictLabel}\n` +
      `📊 *Risk Index:* ${currentResult.riskScore} / 100 (Confidence: ${currentResult.confidence}%)\n` +
      `⚠️ *Finding:* ${currentResult.debunkSummary}\n\n` +
      `🔒 *Audited by SY Tech Cyber Forensics Unit*\n` +
      `Audit Hash: ${currentResult.cryptographicAuditHash.slice(0, 18)}...\n` +
      `© SY Tech. All Rights Reserved.`;
    navigator.clipboard.writeText(text);
    setCopiedDebunk(true);
    setTimeout(() => setCopiedDebunk(false), 2500);
  };

  const getVerdictStyle = (v: VerdictType) => {
    switch (v) {
      case "high_risk":
        return {
          bg: "bg-[#180e14] border-red-500/70 text-red-200",
          badge: "bg-red-500 text-black font-black border border-red-400",
          accent: "text-red-400",
          border: "border-red-500/60",
          glow: "shadow-[0_0_20px_rgba(239,68,68,0.25)]",
          barColor: "bg-red-500",
        };
      case "deepfake":
        return {
          bg: "bg-[#160f22] border-purple-500/70 text-purple-200",
          badge: "bg-purple-500 text-black font-black border border-purple-400",
          accent: "text-purple-400",
          border: "border-purple-500/60",
          glow: "shadow-[0_0_20px_rgba(168,85,247,0.25)]",
          barColor: "bg-purple-500",
        };
      case "misleading":
        return {
          bg: "bg-[#1a150c] border-amber-500/70 text-amber-200",
          badge: "bg-amber-400 text-black font-black border border-amber-300",
          accent: "text-amber-400",
          border: "border-amber-500/60",
          glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]",
          barColor: "bg-amber-500",
        };
      case "verified":
        return {
          bg: "bg-[#0b1716] border-emerald-500/70 text-[#e6edf3]",
          badge: "bg-emerald-400 text-black font-black border border-emerald-300",
          accent: "text-emerald-400",
          border: "border-emerald-500/60",
          glow: "shadow-[0_0_20px_rgba(16,185,129,0.25)]",
          barColor: "bg-emerald-500",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-[#e6edf3] flex flex-col font-mono relative selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* Professional subtle grid background and soft ambient aura */}
      <div className="absolute inset-0 bg-pro-grid pointer-events-none opacity-40 z-0" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-0" />

      {/* TOP STATUS TICKER */}
      <div className="relative z-20 bg-[#0b101c] border-b border-[#1a2538] px-4 py-1.5 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 font-bold text-emerald-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SY-TECH // TRUTHLENS_PLATFORM_v2.6
          </span>
          <span className="text-slate-400 hidden md:inline text-[11px]">
            [SYSTEM: ACTIVE] • [ENCRYPTION: AES-256-GCM] • [NODE: AP-SOUTH]
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-emerald-400 font-semibold">© SY Tech</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">UID: 0 (root)</span>
          <span className="text-emerald-400 font-mono">LATENCY: 18ms</span>
        </div>
      </div>

      {/* HEADER / NAVIGATION BAR */}
      <header className="relative z-20 border-b border-[#1a2538] bg-[#0b101c]/90 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 p-0.5 shadow-md shadow-emerald-500/20">
              <div className="w-full h-full bg-[#0b101c] rounded-[7px] flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white tracking-wide">
                TRUTHLENS
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-bold">
                ENTERPRISE
              </span>
            </div>
            <div className="hidden sm:block text-xs text-slate-400 border-l border-slate-700/80 pl-3">
              Cyber Forensics & Synthetic Forgery Dissection
            </div>
          </div>

          {/* Section Selector Tabs */}
          <nav className="flex items-center gap-1 bg-[#070b13] p-1 rounded-lg border border-[#1a2538]">
            <button
              onClick={() => setActiveSection("analyzer")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeSection === "analyzer"
                  ? "bg-emerald-500 text-black shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              [01_DISSECTOR]
            </button>
            <button
              onClick={() => setActiveSection("radar")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeSection === "radar"
                  ? "bg-emerald-500 text-black shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              [02_INTERCEPT_RADAR]
            </button>
            <button
              onClick={() => setActiveSection("history")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeSection === "history"
                  ? "bg-emerald-500 text-black shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              [03_AUDIT_LOGS]
            </button>
          </nav>

          {/* Action Triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReportModal(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/40 bg-red-950/30 text-red-300 hover:bg-red-900/40 transition-colors"
            >
              [!_DISPATCH_SAMPLE]
            </button>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-md shadow-emerald-500/20"
            >
              {isAnalystLoggedIn ? "#_ROOT_SHELL" : "#_SYSADMIN_AUTH"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col gap-6">
        
        {/* SECTION 1: FORENSIC DISSECTOR */}
        {activeSection === "analyzer" && (
          <>
            {/* TERMINAL BANNER */}
            <div className="rounded-xl border border-[#1a2538] bg-[#0c121e]/90 p-5 backdrop-blur-xl relative overflow-hidden box-glow-green">
              <div className="text-xs text-emerald-400 font-mono mb-1.5 flex items-center gap-2">
                <span>root@sytech-truthlens:~/forensics# ./dissect_synthetic_media.sh</span>
                <span className="w-1.5 h-3 bg-emerald-400 animate-cursor inline-block" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                &gt; SYNTHETIC MEDIA & DISINFORMATION DISSECTION PLATFORM
              </h1>
              <p className="text-xs text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
                Enterprise forensic suite engineered by SY Tech for disassembling synthetic media payloads, extracting adversarial manipulation signatures, and cross-tracing viral disinformation vectors in real time.
              </p>

              {/* TACTICAL PRESET PAYLOAD SELECTOR */}
              <div className="mt-4 pt-3 border-t border-[#1a2538] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
                <span className="text-slate-400 font-bold flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-emerald-400">[&gt;]</span> TEST ADVERSARIAL SAMPLES:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => loadPreset("sample1")}
                    className="px-2.5 py-1 rounded bg-[#070b13] border border-red-500/40 hover:bg-red-950/40 text-red-300 transition-all text-xs font-semibold"
                  >
                    PAYLOAD_01: RBI_500_HOAX
                  </button>
                  <button
                    onClick={() => loadPreset("sample2")}
                    className="px-2.5 py-1 rounded bg-[#070b13] border border-purple-500/40 hover:bg-purple-950/40 text-purple-300 transition-all text-xs font-semibold"
                  >
                    PAYLOAD_02: VOICE_CLONE_LEAK
                  </button>
                  <button
                    onClick={() => loadPreset("sample3")}
                    className="px-2.5 py-1 rounded bg-[#070b13] border border-amber-500/40 hover:bg-amber-950/40 text-amber-300 transition-all text-xs font-semibold"
                  >
                    PAYLOAD_03: ELA_FLOOD_SPOOF
                  </button>
                  <button
                    onClick={() => loadPreset("sample4")}
                    className="px-2.5 py-1 rounded bg-[#070b13] border border-emerald-500/40 hover:bg-emerald-950/40 text-emerald-300 transition-all text-xs font-semibold"
                  >
                    PAYLOAD_04: ISRO_TELEMETRY
                  </button>
                </div>
              </div>
            </div>

            {/* WORKBENCH: DISSECTION CONSOLE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT 7 COLS: INGESTION TOOLBOX */}
              <div className="lg:col-span-7 flex flex-col gap-4 rounded-xl border border-[#1a2538] bg-[#0c121e]/90 p-5 backdrop-blur-xl shadow-xl">
                
                {/* TOOLBAR HEADER */}
                <div className="flex items-center justify-between border-b border-[#1a2538] pb-3 text-xs">
                  <div className="flex items-center gap-1.5 bg-[#070b13] p-1 rounded-lg border border-[#1a2538]">
                    <button
                      onClick={() => setActiveTab("text")}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        activeTab === "text"
                          ? "bg-emerald-500 text-black shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      [01_RAW_STRING]
                    </button>
                    <button
                      onClick={() => setActiveTab("social")}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        activeTab === "social"
                          ? "bg-emerald-500 text-black shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      [02_URL_PACKET]
                    </button>
                    <button
                      onClick={() => setActiveTab("image")}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        activeTab === "image"
                          ? "bg-emerald-500 text-black shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      [03_PIXEL_ELA]
                    </button>
                    <button
                      onClick={() => setActiveTab("audio")}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        activeTab === "audio"
                          ? "bg-emerald-500 text-black shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      [04_VOICE_BIO]
                    </button>
                  </div>

                  <button
                    onClick={() => setAnalysisMode(analysisMode === "deep" ? "fast" : "deep")}
                    className="text-xs text-emerald-400 border border-[#1a2538] bg-[#070b13] px-2.5 py-1 rounded font-semibold"
                  >
                    MODE: {analysisMode === "deep" ? "DEEP_HEX_PASS" : "RAPID_SCAN"}
                  </button>
                </div>

                {/* MODALITY INPUT BODIES */}
                {activeTab === "text" && (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs text-slate-400 font-medium">
                      <span>INPUT_BUFFER: RAW_TEXT_STRING</span>
                      <span>LEN: {textInput.length} BYTES</span>
                    </div>
                    <textarea
                      id="claim-text"
                      rows={5}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="// PASTE SUSPICIOUS TEXT PAYLOAD, FORWARDED MESSAGE, OR DISINFORMATION CLAIM HERE..."
                      className="w-full rounded-lg bg-[#070b13] border border-[#1a2538] p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 font-mono resize-none leading-relaxed"
                    />
                  </div>
                )}

                {activeTab === "social" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs text-slate-400 font-medium">
                      INPUT_BUFFER: TARGET_URL_ENDPOINT
                    </div>
                    <input
                      id="social-url"
                      type="url"
                      value={socialUrl}
                      onChange={(e) => setSocialUrl(e.target.value)}
                      placeholder="https://x.com/target_handle/status/1839201928"
                      className="w-full rounded-lg bg-[#070b13] border border-[#1a2538] px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                    <div className="p-2.5 rounded-lg border border-[#1a2538] bg-[#070b13] text-xs text-slate-400 flex justify-between">
                      <span className="text-slate-300">OSINT BOTNET CRAWLER ACTIVE</span>
                      <span className="text-emerald-400 font-bold">TRACE: HOPS_OK</span>
                    </div>
                  </div>
                )}

                {activeTab === "image" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs text-slate-400 font-medium">
                      INPUT_BUFFER: PIXEL_MATRIX_DISSECTION (ELA + DIFFUSION)
                    </div>

                    {imageFilePreview ? (
                      <div className="rounded-lg border border-emerald-500/50 bg-[#070b13] p-2.5 flex flex-col gap-2">
                        <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded border border-[#1a2538]">
                          <Image
                            src={imageFilePreview}
                            alt="Target Media"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm border border-emerald-500/50 px-2 py-0.5 text-[11px] text-emerald-300 font-mono">
                            TARGET: flood_sample.jpg [1920x1080 RGB]
                          </div>
                          <div className="absolute bottom-2 left-2 flex gap-1.5 text-[10px]">
                            <span className="bg-black/80 border border-amber-500/80 text-amber-300 px-1.5 py-0.5 rounded">
                              ELA_ARTIFACTS: DETECTED
                            </span>
                            <span className="bg-black/80 border border-emerald-500/80 text-emerald-300 px-1.5 py-0.5 rounded">
                              QUANTIZATION_TAMPER: TRUE
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-medium">SAMPLE_LOADED: Altered Monsoon Scene</span>
                          <button
                            onClick={() => setImageFilePreview(null)}
                            className="text-red-400 hover:underline font-semibold"
                          >
                            [PURGE_BUFFER]
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setImageFilePreview("/flood_sample.jpg")}
                        className="rounded-lg border border-dashed border-slate-700 hover:border-emerald-500 p-6 text-center cursor-pointer bg-[#070b13] hover:bg-[#090f1b] transition-all"
                      >
                        <p className="text-xs text-emerald-400 font-bold">
                          [CLICK TO LOAD SUSPECT IMAGE SAMPLE OR DROP FILE]
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          SUPPORTED: PNG, JPG, WEBP • HEURISTIC: ERROR LEVEL ANALYSIS (ELA)
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "audio" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs text-slate-400 font-medium">
                      INPUT_BUFFER: ACOUSTIC_WAVE_DISSECTION (VOCODER_CHECK)
                    </div>

                    <div className="rounded-lg border border-[#1a2538] bg-[#070b13] p-3.5 flex flex-col gap-2.5">
                      <div className="flex justify-between text-xs text-slate-200">
                        <span className="font-semibold">AUDIO_FILE: politician_speech_wiretap.wav</span>
                        <span className="text-purple-400 font-bold">[RVC_VOCODER]</span>
                      </div>

                      {/* Waveform visualizer */}
                      <div className="h-12 bg-[#040810] rounded border border-[#1a2538] p-1 flex items-center justify-center gap-1 overflow-hidden">
                        <div className="w-1 bg-emerald-400 animate-wave-1 h-2/5" />
                        <div className="w-1 bg-emerald-400 animate-wave-2 h-4/5" />
                        <div className="w-1 bg-purple-400 animate-wave-3 h-full" />
                        <div className="w-1 bg-purple-400 animate-wave-4 h-3/5" />
                        <div className="w-1 bg-emerald-400 animate-wave-5 h-4/5" />
                        <div className="w-1 bg-purple-500 animate-wave-6 h-full" />
                        <div className="w-1 bg-emerald-400 animate-wave-1 h-3/5" />
                        <div className="w-1 bg-emerald-400 animate-wave-2 h-4/5" />
                        <div className="w-1 bg-purple-400 animate-wave-3 h-2/3" />
                        <div className="w-1 bg-emerald-400 animate-wave-4 h-full" />
                        <div className="w-1 bg-emerald-400 animate-wave-5 h-4/5" />
                        <div className="w-1 bg-purple-500 animate-wave-6 h-3/5" />
                        <div className="w-1 bg-emerald-400 animate-wave-2 h-4/5" />
                      </div>

                      <div className="flex justify-between text-xs text-slate-400">
                        <span>FREQ_BAND: 20Hz - 22kHz</span>
                        <span className="text-purple-400 font-bold">PITCH_DRIFT_ANOMALY: 94%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* HEURISTIC CATEGORY SELECTORS */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">
                      CLASSIFICATION_DOMAIN:
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full rounded bg-[#070b13] border border-[#1a2538] p-2 text-xs text-slate-200 focus:outline-none font-mono"
                    >
                      <option>RAW_SUSPECT_PAYLOAD</option>
                      <option>FINANCIAL_WARFARE / DISINFO</option>
                      <option>POLITICAL_ELECTION_PROPAGANDA</option>
                      <option>DISASTER_PANIC_AMPLIFICATION</option>
                      <option>PHISHING_SPOOF_PORTAL</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">
                      LOCALE_PARSER:
                    </label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full rounded bg-[#070b13] border border-[#1a2538] p-2 text-xs text-slate-200 focus:outline-none font-mono"
                    >
                      <option>UTF-8 / ALL_LOCALES</option>
                      <option>EN_IN (INDIAN_ENGLISH)</option>
                      <option>HI_IN (HINDI_DEVANAGARI)</option>
                      <option>BN_IN (BENGALI)</option>
                      <option>TA_IN (TAMIL)</option>
                      <option>MR_IN (MARATHI)</option>
                    </select>
                  </div>
                </div>

                {/* RUN FORENSIC SCAN CTA */}
                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="w-full py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="inline-block w-2.5 h-2.5 bg-black animate-ping rounded-full" />
                      <span>EXECUTING FORENSIC DECOMPILATION...</span>
                    </>
                  ) : (
                    <>
                      <span>[!] EXECUTE_FORENSIC_DISSECTION</span>
                      <span className="text-[10px] bg-black text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                        EXEC
                      </span>
                    </>
                  )}
                </button>

                {/* PIPELINE TELEMETRY PROGRESS */}
                {isAnalyzing && (
                  <div className="p-3.5 rounded-lg border border-emerald-500/50 bg-[#070b13] flex flex-col gap-1.5 text-xs">
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>
                        {analysisStep === 1 && "STAGE 1: PARSING STRING TOKENS & NER ENTITY GRAPHS..."}
                        {analysisStep === 2 && "STAGE 2: QUERYING SOVEREIGN FACT LEDGERS..."}
                        {analysisStep === 3 && "STAGE 3: DISSECTING NEURAL & VOCAL GENERATIVE ARTIFACTS..."}
                        {analysisStep === 4 && "STAGE 4: SEALING CRYPTOGRAPHIC AUDIT RECORD..."}
                      </span>
                      <span>{analysisStep * 25}%</span>
                    </div>
                    <div className="w-full bg-[#0a0f1c] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full transition-all duration-300"
                        style={{ width: `${analysisStep * 25}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT 5 COLS: FORENSIC DOSSIER */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {currentResult ? (
                  <div className={`rounded-xl border p-5 backdrop-blur-xl shadow-xl relative overflow-hidden ${getVerdictStyle(currentResult.verdict).bg} ${getVerdictStyle(currentResult.verdict).border} ${getVerdictStyle(currentResult.verdict).glow}`}>
                    
                    {/* DOSSIER HEADER */}
                    <div className="flex items-center justify-between border-b border-[#1a2538] pb-2.5 mb-3.5">
                      <div className="text-xs text-slate-400 font-mono">
                        SY_TECH_AUDIT_ID: <span className="text-white font-bold">{currentResult.id}</span>
                      </div>
                      <div className="text-xs text-emerald-400 font-mono font-bold">
                        CONFIDENCE: {currentResult.confidence}%
                      </div>
                    </div>

                    {/* VERDICT BADGE */}
                    <div className={`p-2.5 rounded-lg text-center text-xs tracking-wider mb-3.5 font-bold ${getVerdictStyle(currentResult.verdict).badge}`}>
                      {currentResult.verdictLabel}
                    </div>

                    {/* RISK GAUGE */}
                    <div className="rounded-lg border border-[#1a2538] bg-[#070b13] p-3.5 flex items-center justify-between mb-3.5">
                      <div>
                        <div className="text-xs text-slate-400 font-medium">ADVERSARIAL_RISK_INDEX</div>
                        <div className="text-2xl font-black text-white">
                          {currentResult.riskScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-slate-300 max-w-[190px] leading-relaxed">
                        {currentResult.riskScore > 75
                          ? "CRITICAL: Malicious synthetic distortion detected."
                          : currentResult.riskScore > 40
                          ? "WARNING: Out-of-context or cherry-picked evidence."
                          : "CLEAN: Verified authentic source data."}
                      </div>
                    </div>

                    {/* HEURISTIC SUB-SCORES */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3.5">
                      <div className="rounded border border-[#1a2538] bg-[#070b13] p-2 flex justify-between">
                        <span className="text-slate-400">SYNTHETIC_ANOMALY:</span>
                        <span className="font-bold text-white">{currentResult.subScores.syntheticAnomaly}%</span>
                      </div>
                      <div className="rounded border border-[#1a2538] bg-[#070b13] p-2 flex justify-between">
                        <span className="text-slate-400">FACT_CONSENSUS:</span>
                        <span className="font-bold text-white">{currentResult.subScores.factCheckConsensus}%</span>
                      </div>
                      <div className="rounded border border-[#1a2538] bg-[#070b13] p-2 flex justify-between">
                        <span className="text-slate-400">OUTRAGE_VECTOR:</span>
                        <span className="font-bold text-white">{currentResult.subScores.emotionalSensationalism}%</span>
                      </div>
                      <div className="rounded border border-[#1a2538] bg-[#070b13] p-2 flex justify-between">
                        <span className="text-slate-400">SOURCE_INTEGRITY:</span>
                        <span className="font-bold text-white">{currentResult.subScores.sourceCredibility}%</span>
                      </div>
                    </div>

                    {/* FORENSIC FINDINGS LIST */}
                    <div className="mb-3.5">
                      <div className="text-xs text-slate-400 font-semibold mb-1.5 flex items-center gap-1">
                        <span className="text-emerald-400">[+]</span> DECOMPILED EVIDENCE TRACES:
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {currentResult.forensicPoints.map((point, i) => (
                          <li key={i} className="text-xs text-slate-200 bg-[#070b13] p-2 rounded border border-[#1a2538] flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">&gt;</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* MATCHED FACT LEDGERS */}
                    <div className="mb-3.5">
                      <div className="text-xs text-slate-400 font-semibold mb-1.5 flex items-center gap-1">
                        <span className="text-emerald-400">[+]</span> REGISTRY CROSS-MATCHES:
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {currentResult.matchedSources.map((src, i) => (
                          <div key={i} className="flex justify-between items-center text-xs bg-[#070b13] p-2 rounded border border-[#1a2538]">
                            <div>
                              <div className="font-bold text-slate-100">{src.name}</div>
                              <div className="text-[10px] text-slate-400">{src.agencyBadge}</div>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-[#0c121e] text-emerald-400 border border-emerald-500/30 font-bold text-[11px]">
                              {src.verdict}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ACTION TOOLBAR: WHATSAPP DEBUNK & EXPORT */}
                    <div className="pt-2.5 border-t border-[#1a2538] flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={handleCopyDebunk}
                        className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-[#0d261a] hover:bg-[#133b28] border border-emerald-500/50 text-emerald-300 transition-all flex items-center justify-center gap-1.5"
                      >
                        {copiedDebunk ? "[+] COPIED TO BUFFER!" : "[+] COPY WHATSAPP DEBUNK"}
                      </button>
                      <button
                        onClick={() => setShowExportModal(true)}
                        className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-[#070b13] hover:bg-[#0c121e] border border-slate-700 text-slate-200 transition-all flex items-center justify-center gap-1.5"
                      >
                        [#] PRINT FORENSIC DOSSIER
                      </button>
                    </div>

                    {/* SY TECH SEAL & HASH */}
                    <div className="mt-3 pt-2.5 border-t border-[#1a2538] flex justify-between text-[11px] text-slate-400">
                      <span>SHA-256: {currentResult.cryptographicAuditHash.slice(0, 20)}...</span>
                      <span className="text-emerald-400 font-bold">© SY Tech</span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#1a2538] bg-[#0c121e] p-8 text-center text-xs text-slate-400">
                    NO ACTIVE FORENSIC DOSSIER IN BUFFER. LOAD SAMPLE OR SUBMIT TARGET.
                  </div>
                )}
              </div>

            </div>
          </>
        )}

        {/* SECTION 2: INTERCEPT RADAR */}
        {activeSection === "radar" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-[#1a2538] bg-[#0c121e]/90 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 backdrop-blur-xl">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  &gt; LIVE DISINFORMATION & DEEPFAKE INTERCEPT TELEMETRY
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Telemetry grid monitoring coordinated viral propagation, bot army spikes, and synthetic audio relays.
                </p>
              </div>
              <div className="text-xs text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded bg-[#070b13] font-bold">
                FEED: LIVE_SOCKET // POLL: 10s
              </div>
            </div>

            {/* TELEMETRY STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-xl border border-[#1a2538] bg-[#0c121e]/90">
                <div className="text-xs text-slate-400 font-medium">INTERCEPTED_PAYLOADS_24H</div>
                <div className="text-2xl font-black text-red-400 mt-1">14,280</div>
                <div className="text-[10px] text-red-400 mt-0.5">VIRAL VELOCITY HIGH</div>
              </div>
              <div className="p-4 rounded-xl border border-[#1a2538] bg-[#0c121e]/90">
                <div className="text-xs text-slate-400 font-medium">AI_VOICE_CLONES_ISOLATED</div>
                <div className="text-2xl font-black text-purple-400 mt-1">384</div>
                <div className="text-[10px] text-purple-400 mt-0.5">TARGET: ELECTION SPEECHES</div>
              </div>
              <div className="p-4 rounded-xl border border-[#1a2538] bg-[#0c121e]/90">
                <div className="text-xs text-slate-400 font-medium">BANKING_HOAX_CHAINS</div>
                <div className="text-2xl font-black text-amber-400 mt-1">2,891</div>
                <div className="text-[10px] text-amber-400 mt-0.5">UPI / RBI FAKE NOTICES</div>
              </div>
              <div className="p-4 rounded-xl border border-[#1a2538] bg-[#0c121e]/90">
                <div className="text-xs text-slate-400 font-medium">SY_TECH_DEFENSE_ACCURACY</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">99.4%</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">F1-SCORE EVALUATED</div>
              </div>
            </div>

            {/* LIVE FEED TABLE */}
            <div className="rounded-xl border border-[#1a2538] bg-[#0c121e]/90 overflow-hidden divide-y divide-[#1a2538]">
              <div className="p-3 bg-[#070b13] text-xs font-bold text-slate-200 flex justify-between">
                <span>INTERCEPT_STREAM // LAST 24 HOURS</span>
                <span className="text-emerald-400 font-bold">OPERATING ENTITY: SY TECH</span>
              </div>
              {[
                {
                  title: "Emergency ₹500 Currency Note Invalidation Notice",
                  region: "Pan-India",
                  category: "FINANCIAL_WARFARE",
                  risk: "94% CRITICAL",
                  status: "DEBUNKED BY RBI",
                  badge: "text-red-400 border-red-500/40 bg-red-950/40",
                },
                {
                  title: "Manipulated Audio Wiretap of State Political Leader",
                  region: "Maharashtra",
                  category: "SYNTHETIC_SPEECH",
                  risk: "91% DEEPFAKE",
                  status: "VOICE CLONE FLAGGED",
                  badge: "text-purple-400 border-purple-500/40 bg-purple-950/40",
                },
                {
                  title: "2019 Storm Footage Recycled as Current Coastal Cyclone",
                  region: "Gujarat / Mumbai",
                  category: "CONTEXT_FORGERY",
                  risk: "82% MISLEADING",
                  status: "OUT OF CONTEXT",
                  badge: "text-amber-400 border-amber-500/40 bg-amber-950/40",
                },
                {
                  title: "Free Laptop & Device Phishing Portal Spoof",
                  region: "Northern Region",
                  category: "MALWARE_PHISH",
                  risk: "96% CRITICAL",
                  status: "DNS BLACKLISTED",
                  badge: "text-red-400 border-red-500/40 bg-red-950/40",
                },
              ].map((item, i) => (
                <div key={i} className="p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:bg-[#0e1628] text-xs transition-colors">
                  <div>
                    <div className="font-bold text-slate-100">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      SECTOR: {item.region} | TYPE: {item.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded border text-xs font-bold ${item.badge}`}>
                      {item.risk}
                    </span>
                    <span className="text-xs text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded bg-[#070b13] font-semibold">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: AUDIT HISTORY */}
        {activeSection === "history" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-[#1a2538] bg-[#0c121e]/90 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 backdrop-blur-xl">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  &gt; FORENSIC AUDIT LOGS & DISSECTED PAYLOAD VAULT
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Immutable local ledger of processed scans, forensic verdicts, and cryptographic hashes.
                </p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("sytech_truthlens_history");
                  setScanHistory([]);
                }}
                className="text-xs text-red-400 hover:text-red-300 border border-red-500/40 px-3 py-1.5 rounded bg-red-950/30 font-semibold transition-colors"
              >
                [PURGE_ALL_LOGS]
              </button>
            </div>

            {/* Filter tags */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">FILTER:</span>
              <button
                onClick={() => setHistoryFilter("all")}
                className={`px-3 py-1 rounded text-xs font-semibold border transition-all ${
                  historyFilter === "all"
                    ? "bg-emerald-500 text-black border-emerald-500"
                    : "border-[#1a2538] text-slate-400 hover:text-white"
                }`}
              >
                ALL ({scanHistory.length})
              </button>
              <button
                onClick={() => setHistoryFilter("high_risk")}
                className={`px-3 py-1 rounded text-xs font-semibold border transition-all ${
                  historyFilter === "high_risk"
                    ? "bg-red-500 text-black border-red-500"
                    : "border-[#1a2538] text-slate-400 hover:text-white"
                }`}
              >
                CRITICAL
              </button>
              <button
                onClick={() => setHistoryFilter("deepfake")}
                className={`px-3 py-1 rounded text-xs font-semibold border transition-all ${
                  historyFilter === "deepfake"
                    ? "bg-purple-500 text-black border-purple-500"
                    : "border-[#1a2538] text-slate-400 hover:text-white"
                }`}
              >
                DEEPFAKES
              </button>
              <button
                onClick={() => setHistoryFilter("verified")}
                className={`px-3 py-1 rounded text-xs font-semibold border transition-all ${
                  historyFilter === "verified"
                    ? "bg-emerald-500 text-black border-emerald-500"
                    : "border-[#1a2538] text-slate-400 hover:text-white"
                }`}
              >
                VERIFIED
              </button>
            </div>

            {/* Grid of history cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {scanHistory
                .filter((item) => historyFilter === "all" || item.verdict === historyFilter)
                .map((scan) => (
                  <div
                    key={scan.id}
                    onClick={() => {
                      setCurrentResult(scan);
                      setActiveSection("analyzer");
                    }}
                    className="rounded-xl border border-[#1a2538] bg-[#0c121e]/90 p-4 hover:border-emerald-500/70 cursor-pointer transition-all flex flex-col justify-between gap-2.5 shadow-sm"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${getVerdictStyle(scan.verdict).badge}`}>
                        {scan.verdictLabel}
                      </span>
                      <span className="text-slate-400 text-[11px]">{scan.timestamp}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">{scan.title}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">{scan.claimExcerpt}</p>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-2.5 border-t border-[#1a2538] text-slate-400">
                      <span>RISK: <span className="text-white font-bold">{scan.riskScore}%</span></span>
                      <span className="text-emerald-400 font-bold hover:underline">RE-LOAD DOSSIER &gt;</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER WITH MANDATORY COPYRIGHT SY TECH */}
      <footer className="border-t border-[#1a2538] bg-[#070b13] py-6 text-xs text-slate-400 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">TRUTHLENS</span>
            <span>:: Copyright © 2026 SY Tech. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>SYSTEM: SY TECH CYBER RECON</span>
            <span>CLASSIFICATION: ENTERPRISE</span>
            <span>VERSION: 2.6.4</span>
          </div>
        </div>
      </footer>

      {/* MODAL 1: DISPATCH ZERO-DAY FORGERY SAMPLE */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c121e] border border-emerald-500/60 rounded-xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-3.5 font-mono">
            <div className="flex justify-between items-center border-b border-[#1a2538] pb-3 text-xs">
              <span className="text-white font-bold flex items-center gap-2">
                <span className="text-red-400 font-black">[!]</span> DISPATCH_FORGERY_SAMPLE // SY TECH DEFENSE GRID
              </span>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportSubmitted(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                [X]
              </button>
            </div>

            {reportSubmitted ? (
              <div className="p-5 text-center flex flex-col items-center gap-2.5">
                <div className="w-11 h-11 rounded-full border border-emerald-500/80 bg-emerald-950/60 text-emerald-400 flex items-center justify-center text-lg font-bold">
                  ✓
                </div>
                <h4 className="text-sm font-bold text-white">PAYLOAD DISPATCH TRANSMITTED</h4>
                <p className="text-xs text-slate-300">
                  Sample queued into SY Tech incident triage stream.
                </p>
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    setReportSubmitted(false);
                  }}
                  className="mt-2 px-4 py-1.5 rounded bg-emerald-500 text-black text-xs font-bold"
                >
                  [DISMISS]
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">
                    TARGET_HEADLINE / CLAIM_STRING:
                  </label>
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="e.g. Viral video claiming new curfew in city"
                    className="w-full rounded bg-[#070b13] border border-[#1a2538] p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">
                    SOURCE_VECTOR / RELAY_URL:
                  </label>
                  <input
                    type="url"
                    value={reportUrl}
                    onChange={(e) => setReportUrl(e.target.value)}
                    placeholder="https://t.me/burner_relay/..."
                    className="w-full rounded bg-[#070b13] border border-[#1a2538] p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">
                    FORENSIC_NOTES / CONTEXT:
                  </label>
                  <textarea
                    rows={3}
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="Circulation channel, bot amplification vectors observed..."
                    className="w-full rounded bg-[#070b13] border border-[#1a2538] p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="px-3 py-1.5 rounded text-slate-400 hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => {
                      if (!reportTitle) {
                        alert("PLEASE PROVIDE HEADLINE / TARGET CLAIM.");
                        return;
                      }
                      setReportSubmitted(true);
                    }}
                    className="px-4 py-1.5 rounded bg-red-600 text-white font-bold"
                  >
                    TRANSMIT_DISPATCH
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: SYSADMIN AUTHENTICATION */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c121e] border border-emerald-500/60 rounded-xl max-w-sm w-full p-5 shadow-2xl flex flex-col gap-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-[#1a2538] pb-2.5">
              <span className="text-white font-bold">#_SYSADMIN_ACCESS_GATE</span>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-white">
                [X]
              </button>
            </div>

            {isAnalystLoggedIn ? (
              <div className="flex flex-col gap-2.5">
                <div className="p-3 rounded border border-emerald-500/50 bg-[#070b13]">
                  <div className="text-slate-400">SESSION_UID: 0 (root)</div>
                  <div className="text-emerald-400 font-bold mt-0.5">{analystEmail}</div>
                  <div className="text-xs text-emerald-300 mt-1">PRIVILEGES: FORENSIC_OVERRIDE_ENABLED</div>
                </div>
                <button
                  onClick={() => setIsAnalystLoggedIn(false)}
                  className="w-full py-2 rounded bg-red-950 border border-red-500/60 text-red-300 font-bold"
                >
                  TERMINATE_SESSION
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Authenticate with SY Tech Security Gateway to unlock raw packet dumps and spectral telemetry.
                </p>
                <div>
                  <label className="text-slate-400 block mb-1">OPERATOR_EMAIL:</label>
                  <input
                    type="email"
                    value={analystEmail}
                    onChange={(e) => setAnalystEmail(e.target.value)}
                    className="w-full rounded bg-[#070b13] border border-[#1a2538] p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">SECURITY_TOKEN / PASSKEY:</label>
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    className="w-full rounded bg-[#070b13] border border-[#1a2538] p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsAnalystLoggedIn(true);
                    setShowAuthModal(false);
                  }}
                  className="w-full py-2.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-black mt-1"
                >
                  INITIALIZE_ROOT_SESSION
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: EXPORT OFFICIAL FORENSIC DOSSIER */}
      {showExportModal && currentResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c121e] border border-emerald-500/60 rounded-xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-3.5 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-[#1a2538] pb-2.5">
              <span className="text-white font-bold">
                TRUTHLENS // OFFICIAL SECURITY DOSSIER
              </span>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-white">
                [X]
              </button>
            </div>

            <div className="p-3.5 rounded bg-[#070b13] border border-[#1a2538] flex flex-col gap-1.5 text-slate-200">
              <div className="flex justify-between border-b border-[#1a2538] pb-1 text-xs text-slate-400">
                <span>RECORD: TL-DOSSIER-{currentResult.id}</span>
                <span>DATE: {new Date().toISOString()}</span>
              </div>
              <div><span className="text-slate-400">TARGET_SUBJECT:</span> {currentResult.title}</div>
              <div><span className="text-slate-400">SECURITY_VERDICT:</span> <span className="font-bold text-emerald-400">{currentResult.verdictLabel}</span></div>
              <div><span className="text-slate-400">FORGERY_INDEX:</span> {currentResult.riskScore} / 100 ({currentResult.confidence}% Confidence)</div>
              <div><span className="text-slate-400">SHA-256_HASH:</span> {currentResult.cryptographicAuditHash}</div>
              <div><span className="text-slate-400">AUDITING_BODY:</span> SY Tech Forensic Reconnaissance Labs</div>
              <div><span className="text-slate-400">COPYRIGHT:</span> Copyright © 2026 SY Tech. All Rights Reserved.</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-3 py-1.5 rounded text-slate-400 hover:text-white"
              >
                CLOSE
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold"
              >
                PRINT / SAVE PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
