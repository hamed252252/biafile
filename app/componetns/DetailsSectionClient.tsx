"use client";

import { useState, useMemo } from "react";
import {
  Star,
  Download,
  Share2,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LessonHeadingEntity } from "../type/edcation";
import DOMPurify from "dompurify";

// Extend LessonHeadingEntity to include score
interface ExtendedLessonHeadingEntity extends LessonHeadingEntity {
  score?: number;
}

const baseUrl = process.env.API_UPLOADED_FILES || "https://api.biafile.ir/files/";

interface FileDownloadProps {
  files: { Title: string; PathFileName: string; Price?: string }[];
  baseUrl: string;
}

const FileDownloadList = ({ files, baseUrl }: FileDownloadProps) => (
  <div className="flex flex-col sm:flex-row gap-4">
    {files.length > 0 ? (
      files.map((file, index) => (
        <a
          key={index}
          href={`${baseUrl}${file.PathFileName}`}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="block flex-1"
        >
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-center"
            aria-label={`دانلود فایل ${file.Title}`}
          >
            <Download className="ml-2 h-4 w-4" />
            دانلود {file.Title} {file.Price ? `(${file.Price})` : ""}
          </Button>
        </a>
      ))
    ) : (
      <p className="text-sm text-muted-foreground">
        هیچ فایلی برای دانلود در دسترس نیست.
      </p>
    )}
  </div>
);

export default function DetailsSectionClient({
  Lesson,
}: {
  Lesson: ExtendedLessonHeadingEntity | undefined;
}) {
  const [rating] = useState(
    Math.min(Math.max(Lesson?.score ?? 0, 0), 5)
  );

  const files = useMemo(() => {
    if (!Lesson?.jsonFiles) return [];
    if (Array.isArray(Lesson.jsonFiles)) return Lesson.jsonFiles;
    try {
      return JSON.parse(Lesson.jsonFiles as string);
    } catch (error) {
      console.error("Invalid jsonFiles format:", error);
      return [];
    }
  }, [Lesson?.jsonFiles]);

  const sanitizedDescription = useMemo(() => {
    if (!Lesson?.longDescription) return "";
    return DOMPurify.sanitize(Lesson.longDescription);
  }, [Lesson?.longDescription]);

  if (!Lesson) {
    return (
      <div className="space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 text-center">
        <p className="text-lg text-red-500">
          خطا: اطلاعات درس یافت نشد.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8 lg:px-12" dir="rtl">
      {/* Title and Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-center sm:text-right">
          {Lesson.title || "کاربرگ جامع نشانه س"}
        </h1>
        <div className="flex justify-center sm:justify-end gap-1">
          {[...Array(Math.round(rating))].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 fill-primary text-primary"
              aria-label={`امتیاز ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tags/Badges */}
      <div className="flex flex-wrap gap-2">
        {Lesson.resultJsonLables?.map((label) => (
          <Badge key={label.id} variant="secondary">
            {label.text}
          </Badge>
        )) || <p className="text-sm text-muted-foreground">بدون برچسب</p>}
      </div>

      {/* Date and Views */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <p>تاریخ ثبت: {Lesson.registerDate || "نامشخص"}</p>
        <p>آخرین ویرایش: {Lesson.editDate || "نامشخص"}</p>
      </div>

      {/* Long Description */}
      {sanitizedDescription && (
        <div
          className="prose prose-sm sm:prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      )}

      {/* File Downloads */}
      <FileDownloadList files={files} baseUrl={baseUrl} />

      {/* Share and Report */}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <Button
          variant="ghost"
          size="sm"
          aria-label="اشتراک‌گذاری درس"
        >
          <Share2 className="ml-2 h-4 w-4" />
          اشتراک‌گذاری
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label="گزارش مشکل درس"
        >
          <BookOpen className="ml-2 h-4 w-4" />
          گزارش مشکل
        </Button>
      </div>

      {/* Designer Info */}
      <div className="bg-muted/50 p-4 rounded-lg text-center sm:text-right">
        <p className="text-sm text-muted-foreground">
          طراح: <span className="font-bold">{Lesson.designer || "نامشخص"}</span>
        </p>
      </div>
    </div>
  );
}