"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Globe, LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  content: z
    .string()
    .url("Please enter a valid URL")
    .max(2048, "URL must be less than 2,048 characters"),
});

type FormData = z.infer<typeof schema>;

interface UrlInputProps {
  onAnalyze: (content: string) => void;
}

export function UrlInput({ onAnalyze }: UrlInputProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsAnalyzing(true);
    onAnalyze(data.content);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="url-input"
          className="block text-sm font-medium mb-2 text-foreground"
        >
          URL to Verify
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="url-input"
            placeholder="https://example.com/article-to-verify"
            className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
            {...register("content")}
          />
        </div>
        <div className="mt-2">
          {errors.content ? (
            <p className="text-sm text-red-400">{errors.content.message}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Enter a URL to analyze its content and source credibility
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isAnalyzing}
        className="w-full sm:w-auto"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <LinkIcon className="mr-2 h-4 w-4" />
            Verify URL
          </>
        )}
      </Button>
    </form>
  );
}
