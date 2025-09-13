'use client';

import { useMemo, useState } from 'react';
import { Star, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LessonHeadingEntity } from '../type/edcation';
import { FileDownloadList } from '../components/lesson/FileDownloadList';
import sanitize from 'sanitize-html';

interface ExtendedLessonHeadingEntity extends LessonHeadingEntity {
  score?: number;
}
interface LessonFile {
  Title: string; // عنوان فایل
  PathFileName: string; // مسیر فایل (ممکنه فقط اسم فایل باشه)
}

const baseUrl = process.env.API_UPLOADED_FILES || 'https://api.biafile.ir/files/';

export default function DetailsSectionClient({
  Lesson,
}: {
  Lesson: ExtendedLessonHeadingEntity | undefined;
}) {
  const [rating] = useState(Math.min(Math.max(Lesson?.score ?? 0, 0), 5));

  const files: LessonFile[] = useMemo(() => {
    if (!Lesson?.jsonFiles) return [];
    if (Array.isArray(Lesson.jsonFiles)) return Lesson.jsonFiles;
    try {
      return JSON.parse(Lesson.jsonFiles as string);
    } catch (error) {
      console.error('Invalid jsonFiles format:', error);
      return [];
    }
  }, [Lesson?.jsonFiles]);

  const sanitizedDescription = useMemo(() => {
    if (!Lesson?.longDescription) return '';
    return sanitize(Lesson.longDescription); // ✅ مستقیم از sanitize استفاده می‌کنیم
  }, [Lesson?.longDescription]);
  console.log(Lesson);
  if (!Lesson) {
    return (
      <div className="space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 text-center">
        <p className="text-lg text-red-500">خطا: اطلاعات درس یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8 lg:px-12" dir="rtl">
      {/* عنوان و امتیاز */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-center sm:text-right">
          {Lesson.title || 'کاربرگ جامع نشانه س'}
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

      {/* برچسب‌ها */}
      <div className="flex flex-wrap gap-2">
        {Lesson.resultJsonLables?.length ? (
          Lesson.resultJsonLables.map((label) => (
            <Badge key={label.id} variant="secondary">
              {label.text}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">بدون برچسب</p>
        )}
      </div>

      {/* تاریخ‌ها */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <p>تاریخ ثبت: {Lesson.registerDate || 'نامشخص'}</p>
        <p>آخرین ویرایش: {Lesson.editDate || 'نامشخص'}</p>
      </div>

      {/* توضیحات طولانی */}
      {sanitizedDescription && (
        <div
          className="prose prose-sm sm:prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      )}

      {/* لیست فایل‌ها */}
      <FileDownloadList
        files={files.map((file) => ({
          FileName: file.Title, // Title رو تبدیل می‌کنیم به FileName
          PathFileName: file.PathFileName,
        }))}
      />
      {/* دکمه‌ها */}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <Button variant="ghost" size="sm" aria-label="اشتراک‌گذاری درس">
          <Share2 className="ml-2 h-4 w-4" />
          اشتراک‌گذاری
        </Button>
        <Button variant="ghost" size="sm" aria-label="گزارش مشکل درس">
          <BookOpen className="ml-2 h-4 w-4" />
          گزارش مشکل
        </Button>
      </div>

      {/* اطلاعات طراح */}
      <div className="bg-muted/50 p-4 rounded-lg text-center sm:text-right">
        <p className="text-sm text-muted-foreground">
          طراح: <span className="font-bold">{Lesson.designer || 'نامشخص'}</span>
        </p>
      </div>
    </div>
  );
}
