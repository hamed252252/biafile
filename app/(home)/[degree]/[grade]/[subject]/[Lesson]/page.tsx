import { JsonPicture, LessonHeadingEntity } from '@/app/type/edcation';
import { BreadcrumbClient } from '@/app/componetns/breadcrumClinet';
import DetailsSectionClient from '@/app/componetns/DetailsSectionClient';
import { fetchDataLessonsClassData } from '@/app/lib/fetchdataLessonsClassData';

import { MediaCarousel } from '@/app/componetns/lesson/mediaCarousel';

type RouteParams = {
  degree: string;
  grade: string;
  subject: string;
  Lesson: string;
};

interface CategoryEntity {
  id: number;
  title: string;
  uniqCode: string;
  slug?: string | null;
  subResultCategorys: CategoryEntity[];
}

// ✅ تابع بررسی slug یا uniqCode
const matchesSlug = (
  routeParam: string,
  entity: { slug?: string | null; uniqCode: string },
): boolean => entity.slug === routeParam || entity.uniqCode === routeParam;

export default async function WorksheetDetail({ params }: { params: Promise<RouteParams> }) {
  const { degree, grade, subject, Lesson: lessonId } = await params;

  const { lessons, classData } = await fetchDataLessonsClassData();

  const categories = classData.entities as CategoryEntity[];
  const lessonList = lessons.entities as LessonHeadingEntity[];

  // استفاده از matchesSlug
  const degreeData = categories.find((cat) => matchesSlug(degree, cat));
  if (!degreeData) return null;

  const gradeData = degreeData.subResultCategorys.find((gr) => matchesSlug(grade, gr));
  if (!gradeData) return null;

  const subjectData = gradeData.subResultCategorys.find((su) => matchesSlug(subject, su));
  if (!subjectData) return null;

  const lessonById = lessonList.find((l) => l.id.toString() === lessonId);
  // console.log(lessonById)
  // هندل کردن حالتی که jsonPictures ممکنه یا string باشه یا JsonPicture[]
  let rawPictures: JsonPicture[] = [];
  let videoFiles: JsonPicture[] = [];

  if (typeof lessonById?.jsonPictures === 'string') {
    rawPictures = JSON.parse(lessonById.jsonPictures);
  } else if (Array.isArray(lessonById?.jsonPictures)) {
    rawPictures = lessonById.jsonPictures;
  }

  if (typeof lessonById?.jsonVideos === 'string') {
    videoFiles = JSON.parse(lessonById.jsonVideos);
  } else if (Array.isArray(lessonById?.jsonVideos)) {
    videoFiles = lessonById.jsonVideos;
  }

  if (!degreeData || !gradeData || !subjectData || !lessonById) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <p className="text-lg text-red-500">خطا: اطلاعات درس یافت نشد. لطفاً دوباره تلاش کنید.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="container mx-auto px-4 mt-4">
        <BreadcrumbClient
          degreeId={degreeData.slug || degreeData.uniqCode}
          degreeTitle={degreeData.title}
          gradeId={gradeData.slug || gradeData.uniqCode}
          GradeTitle={gradeData.title}
          subjectId={subjectData.slug || subjectData.uniqCode}
          subjectTitle={subjectData.title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* پیش‌نمایش */}

          <MediaCarousel images={rawPictures} videos={videoFiles} />

          {/* جزئیات */}
          <div className="space-y-6">
            <DetailsSectionClient Lesson={lessonById} />
          </div>
        </div>
      </div>
    </div>
  );
}
