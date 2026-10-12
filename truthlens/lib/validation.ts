import { z } from "zod";

export const textInputSchema = z.object({
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content must be less than 10,000 characters"),
});

export const urlInputSchema = z.object({
  content: z
    .string()
    .url("Please enter a valid URL")
    .max(2048, "URL must be less than 2,048 characters"),
});

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  fileSize: z.number().max(50 * 1024 * 1024, "File must be less than 50MB"),
  mimeType: z.string(),
});

export const imageUploadSchema = fileUploadSchema.extend({
  mimeType: z.enum([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/bmp",
    "image/tiff",
  ]),
});

export const videoUploadSchema = fileUploadSchema.extend({
  mimeType: z.enum([
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
  ]),
});

export const audioUploadSchema = fileUploadSchema.extend({
  mimeType: z.enum([
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/flac",
    "audio/aac",
    "audio/mp4",
  ]),
});

export const analyzeRequestSchema = z.object({
  type: z.enum(["text", "url", "image", "video", "audio"]),
  content: z.string().min(1, "Content is required"),
});

export type TextInput = z.infer<typeof textInputSchema>;
export type UrlInput = z.infer<typeof urlInputSchema>;
export type AnalyzeRequestInput = z.infer<typeof analyzeRequestSchema>;
