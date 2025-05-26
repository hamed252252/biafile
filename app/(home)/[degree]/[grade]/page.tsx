// app/(home)/[degree]/[grade]/page.tsx
import GradeCard from "@/app/componetns/grade/grade-card";
import { fetchDataLessonsClassData } from "@/app/lib/fetchdataLessonsClassData";
import { notFound } from "next/navigation";
type RouteParams = { degree: string; grade: string };
export default async function GradePage({
    params,
}: {
    params: Promise<RouteParams>; // ✅ نه Promise
}) {
    const { degree, grade } = await params; // بدون await

    const { lessons, classData } =
        await fetchDataLessonsClassData();

    // پیدا کردن داده‌های degree و grade
    const degreeData = classData.entities.find(
        (d) => d.uniqCode === degree
    );
    if (!degreeData) return notFound();

    const gradeData = degreeData.subResultCategorys.find(
        (g) => g.uniqCode === grade
    );
    if (!gradeData) return notFound();

    return (

        <div>
        <GradeCard
            degree={degree}
            gradeSlug={grade}
            gradeData={gradeData}
            lessons={lessons.entities}
        />
        </div>

    );
}
