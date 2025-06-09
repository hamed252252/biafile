import SubjectCard from '@/app/componetns/subject/subject-card';
import { fetchDataLessonsClassData } from '@/app/lib/fetchdataLessonsClassData';
import type { ApiResponseLessonHeading, LessonHeadingEntity } from '@/app/type/edcation';

type RouteParams = {
  degree: string;
  grade: string;
  subject: string;
};

interface CategoryEntity {
  id: number;
  title: string;
  uniqCode: string;
  slug?: string | null;
  subResultCategorys: CategoryEntity[];
}

interface LocalClassData {
  entities: CategoryEntity[];
}

// ✅ تابع کمکی برای بررسی slug یا uniqCode
const matchesSlug = (
  routeParam: string,
  entity: { slug?: string | null; uniqCode: string },
): boolean => entity.slug === routeParam || entity.uniqCode === routeParam;

export default async function SubjectPage({ params }: { params: Promise<RouteParams> }) {
  const { degree, grade, subject } = await params;

  const { lessons, classData } = (await fetchDataLessonsClassData()) as {
    lessons: ApiResponseLessonHeading;
    classData: LocalClassData;
  };

  const categories: CategoryEntity[] = classData.entities;
  const lessonList: LessonHeadingEntity[] = lessons.entities;

  // ✅ استفاده از matchesSlug
  const degreeData = categories.find((cat) => matchesSlug(degree, cat));
  if (!degreeData) return null;

  const gradeData = degreeData.subResultCategorys.find((gr) => matchesSlug(grade, gr));
  if (!gradeData) return null;

  const subjectData = gradeData.subResultCategorys.find((su) => matchesSlug(subject, su));
  if (!subjectData) return null;

  const filteredLessons = lessonList.filter((lesson) => lesson.categoryID === subjectData.id);

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3" dir="rtl">
      {filteredLessons.map((item) => (
        <SubjectCard
          key={item.id}
          title={item.title}
          status={item.resultLessonHeadingStatus.title}
          tags={item.resultJsonLables.map((lbl) => lbl.text)}
          description={item.shortDescription}
          designerAvatar="https://github.com/shadcn.png"
          designerName={item.designer}
          designerRole="طراح"
          updateDate={item.time}
          detailsLink={`/${degree}/${grade}/${subject}/${item.id}`}
        />
      ))}
    </div>
  );
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const { classData } = (await fetchDataLessonsClassData()) as {
    lessons: ApiResponseLessonHeading;
    classData: LocalClassData;
  };

  return classData.entities.flatMap((deg) =>
    deg.subResultCategorys.flatMap((gr) =>
      gr.subResultCategorys.map((su) => ({
        degree: deg.slug || deg.uniqCode,
        grade: gr.slug || gr.uniqCode,
        subject: su.slug || su.uniqCode,
      })),
    ),
  );
}
