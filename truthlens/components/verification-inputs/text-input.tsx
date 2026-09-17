"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content must be less than 10,000 characters"),
});

type FormData = z.infer<typeof schema>;

interface TextInputProps {
  onAnalyze: (content: string) => void;
}

export function TextInput({ onAnalyze }: TextInputProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const content = watch("content", "");
  const charCount = content.length;

  const onSubmit = async (data: FormData) => {
    setIsAnalyzing(true);
    onAnalyze(data.content);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="text-input"
          className="block text-sm font-medium mb-2 text-foreground"
        >
          Content to Verify
        </label>
        <Textarea
          id="text-input"
          placeholder="Paste a claim, message, article, or suspicious content..."
          className="min-h-[200px] resize-y bg-background/50 border-border/50 focus:border-primary/50"
          {...register("content")}
        />
        <div className="flex items-center justify-between mt-2">
          {errors.content ? (
            <p className="text-sm text-red-400">{errors.content.message}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Paste any text content for verification
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {charCount.toLocaleString()} / 10,000
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isAnalyzing || charCount < 10}
        className="w-full sm:w-auto"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Analyze Content
          </>
        )}
      </Button>
    </form>
  );
}
