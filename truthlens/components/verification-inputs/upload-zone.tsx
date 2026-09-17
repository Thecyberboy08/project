"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  FileIcon,
  X,
  Loader2,
  ImageIcon,
  Video,
  Headphones,
} from "lucide-react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  type: UploadContentType;
  accept: string;
  onAnalyze: (content: string) => void;
}

type UploadContentType = "image" | "video" | "audio";

const typeIcons: Record<UploadContentType, typeof ImageIcon> = {
  image: ImageIcon,
  video: Video,
  audio: Headphones,
};

const typeLabels: Record<UploadContentType, string> = {
  image: "image",
  video: "video",
  audio: "audio",
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function UploadZone({ type, accept, onAnalyze }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = typeIcons[type];

  const handleFile = useCallback(
    (selected: File) => {
      if (selected.size > 50 * 1024 * 1024) {
        alert("File must be less than 50MB");
        return;
      }
      setFile(selected);
      if (type === "image") {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(selected);
      }
    },
    [type]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    onAnalyze(file.name);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 sm:p-12 transition-all cursor-pointer",
          isDragging
            ? "border-primary/50 bg-primary/5"
            : "border-border/50 bg-background/30 hover:border-primary/30 hover:bg-muted/20",
          file && "border-primary/30 bg-primary/5"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) handleFile(selected);
          }}
        />

        {file ? (
          <div className="flex flex-col items-center gap-3">
            {preview ? (
              <NextImage
                src={preview}
                alt="Preview"
                width={128}
                height={128}
                className="h-32 w-32 object-cover rounded-lg border border-border/50"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <Icon className="h-8 w-8 text-primary" />
              </div>
            )}
            <div className="text-center">
              <p className="font-medium text-sm">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                Drop a {typeLabels[type]} file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports {type.toUpperCase()} files up to 50MB
              </p>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleAnalyze}
        disabled={!file || isAnalyzing}
        className="w-full sm:w-auto"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <FileIcon className="mr-2 h-4 w-4" />
            Analyze {typeLabels[type]}
          </>
        )}
      </Button>
    </div>
  );
}
