import GradeCard from "@/app/componetns/grade/grade-card";
import { fetchDataLessonsClassData } from "@/app/lib/fetchdataLessonsClassData";
import { notFound } from "next/navigation";

type RouteParams = { degree: string; grade: string };

const matchesSlug = (
    routeParam: string,
    entity: { slug?: string | null; uniqCode: string }
): boolean => entity.slug === routeParam || entity.uniqCode === routeParam;

export default async function GradePage({
    params,
}: {
    params: Promise<RouteParams>;
}) {
    const { degree, grade } = await params;

    const { lessons, classData } = await fetchDataLessonsClassData();

    // بررسی وجود degree
    const degreeData = classData.entities.find((d) =>
        matchesSlug(degree, d)
    );
    if (!degreeData) return notFound();

    // بررسی وجود grade
    const gradeData = degreeData.subResultCategorys.find((g) =>
        matchesSlug(grade, g)
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
