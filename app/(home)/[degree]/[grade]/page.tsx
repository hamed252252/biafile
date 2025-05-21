// app/(home)/[degree]/[grade]/page.tsx

import GradeCard from "@/app/componetns/grade/grade-card";
import type {
    ApiResponseLessonHeading,
    LessonHeadingEntity,
} from "@/app/type/edcation";
import { notFound } from "next/navigation";

type RouteParams = {
    degree: string;
    grade: string;
};

/** اینترفیس برای آیتم‌های classData.entities مطابق آنچه GradeCard لازم دارد */
interface CategoryEntity {
    id: number;
    title: string;
    description: string | null;
    uniqCode: string;
    subResultCategorys: CategoryEntity[];
}

/** چون فقط همین فیلد entities برایمان مهم است */
interface LocalClassData {
    entities: CategoryEntity[];
}

export async function fetchDataLessonsClassData(): Promise<{
    lessons: ApiResponseLessonHeading;
    classData: LocalClassData;
}> {
    const [lessonsRes, classDataRes] = await Promise.all([
        fetch(
            "https://api.biafile.ir/Api/LessonHeadings/AllForPublicPage"
        ),
        fetch(
            "https://api.biafile.ir/Api/Categorys/Public"
        ),
    ]);
    if (!lessonsRes.ok || !classDataRes.ok) {
        throw new Error("Failed to fetch data");
    }
    const lessons: ApiResponseLessonHeading =
        await lessonsRes.json();
    const rawClass = await classDataRes.json();
    const classData: LocalClassData = {
        entities: rawClass.entities, // فقط entities رو می‌گیریم
    };
    return { lessons, classData };
}

export async function generateStaticParams(): Promise<
    RouteParams[]
> {
    const { classData } = await fetchDataLessonsClassData();
    return classData.entities.flatMap((deg) =>
        deg.subResultCategorys.map((gr) => ({
            degree: deg.uniqCode,
            grade: gr.uniqCode,
        }))
    );
}

interface PageProps {
    params: Promise<RouteParams>;
}

const GradePage = async ({ params }: PageProps) => {
    const { degree, grade } = await params;
    const { lessons, classData } =
        await fetchDataLessonsClassData();

    // 1) پیدا کردن degree
    const categories: CategoryEntity[] = classData.entities;
    const degreeData = categories.find(
        (cat) => cat.uniqCode === degree
    );
    if (!degreeData) return notFound();

    // 2) پیدا کردن grade
    const gradeData = degreeData.subResultCategorys.find(
        (sub) => sub.uniqCode === grade
    );
    if (!gradeData) return notFound();

    // 3) لیست درس‌ها
    const lessonEntities: LessonHeadingEntity[] =
        lessons.entities;

    return (
        <GradeCard
            gradeSlug={grade}
            degree={degree}
            gradeData={gradeData}
            lessons={lessonEntities}
        />
    );
};

export default GradePage;
