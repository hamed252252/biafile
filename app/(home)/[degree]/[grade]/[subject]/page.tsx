// app/(home)/[degree]/[grade]/[subject]/page.tsx
import SubjectCard from "@/app/componetns/subject/subject-card";
import { fetchDataLessonsClassData } from "../page";
import type {
    ApiResponseLessonHeading,
    LessonHeadingEntity,
} from "@/app/type/edcation";

type RouteParams = {
    degree: string;
    grade: string;
    subject: string;
};

/**
 * اینترفیس ساده برای داده‌های کلاس‌ها
 * مطابق خروجی واقعی API در nested-cards.tsx
 */
interface CategoryEntity {
    id: number;
    title: string;
    uniqCode: string;
    subResultCategorys: CategoryEntity[];
}

/**
 * چون از ApiResponseCategorysCategorys مستقیم import نکردیم،
 * مشخص می‌کنیم که classData فقط همین فیلد entities را دارد.
 */
interface LocalClassData {
    entities: CategoryEntity[];
}

export default async function SubjectPage({
    params,
}: {
    params: Promise<RouteParams>;
}) {
    // — 1) پارامترهای URL را await می‌کنیم —
    const { degree, grade, subject } = await params;

    // — 2) صدا زدن API —
    const { lessons, classData } =
        (await fetchDataLessonsClassData()) as {
            lessons: ApiResponseLessonHeading;
            classData: LocalClassData;
        };

    // — 3) آرایه‌ها را تایپ می‌کنیم —
    const categories: CategoryEntity[] = classData.entities;
    const lessonList: LessonHeadingEntity[] =
        lessons.entities;

    // — 4) پیمایش درخت دسته‌بندی‌ها —
    const degreeData = categories.find(
        (cat) => cat.uniqCode === degree
    );
    if (!degreeData) return null;

    const gradeData = degreeData.subResultCategorys.find(
        (gr) => gr.uniqCode === grade
    );
    if (!gradeData) return null;

    const subjectData = gradeData.subResultCategorys.find(
        (su) => su.uniqCode === subject
    );
    if (!subjectData) return null;

    // — 5) فیلتر کردن درس‌ها برای این موضوع —
    const filteredLessons = lessonList.filter(
        (lesson) => lesson.categoryID === subjectData.id
    );

    // — 6) رندر نهایی —
    return (
        <div
            className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            dir="rtl"
        >
            {filteredLessons.map((item) => (
                <SubjectCard
                    key={item.id}
                    title={item.title}
                    status={
                        item.resultLessonHeadingStatus.title
                    }
                    tags={item.resultJsonLables.map(
                        (lbl) => lbl.text
                    )}
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

export async function generateStaticParams(): Promise<
    RouteParams[]
> {
    // باز هم همین structure لوکال برای classData
    const { classData } =
        (await fetchDataLessonsClassData()) as {
            lessons: ApiResponseLessonHeading;
            classData: LocalClassData;
        };

    return classData.entities.flatMap((deg) =>
        deg.subResultCategorys.flatMap((gr) =>
            gr.subResultCategorys.map((su) => ({
                degree: deg.uniqCode,
                grade: gr.uniqCode,
                subject: su.uniqCode,
            }))
        )
    );
}
