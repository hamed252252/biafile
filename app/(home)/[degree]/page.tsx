import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
    getEducationalLevels,
    getSubjects,
} from "@/app/lib/mockData";
import SubjectGrid from "@/app/componetns/SubjectGrid";

export const dynamicParams = true;

interface PageProps {
    params: Promise<{
        degree: string;
        grade: string;
    }>;
}

export async function generateStaticParams() {
    const levels = await getEducationalLevels();

    return levels.flatMap((level) =>
        Array.from(
            { length: level.numberOfClasses },
            (_, i) => ({
                degree: level.levelSlug,
                grade: (i + 1).toString(),
            })
        )
    );
}

export default async function DegreeGradePage({
    params,
}: PageProps) {
    const res = await params;
    const { degree, grade } = res;
    const levels = await getEducationalLevels();
    const subjects = await getSubjects();

    const currentDegree = levels.find(
        (level) => level.levelSlug === degree
    );
    if (!currentDegree) notFound();

    const gradeNumber = parseInt(grade, 10);
    if (
        isNaN(gradeNumber) ||
        gradeNumber < 1 ||
        gradeNumber > currentDegree.numberOfClasses
    )
        notFound();

    const gradeName = getGradeName(gradeNumber);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8 text-right">
                {currentDegree.levelName} - پایه {gradeName}
            </h1>
            <Suspense
                fallback={<div>در حال بارگذاری...</div>}
            >
                <SubjectGrid
                    subjects={subjects}
                    degree={degree}
                    grade={grade}
                    gradeName={gradeName}
                    currentDegreeName={
                        currentDegree.levelName
                    }
                />
            </Suspense>
        </div>
    );
}

function getGradeName(gradeNumber: number): string {
    const gradeNames = [
        "اول",
        "دوم",
        "سوم",
        "چهارم",
        "پنجم",
        "ششم",
        "هفتم",
        "هشتم",
        "نهم",
        "دهم",
        "یازدهم",
        "دوازدهم",
    ];
    return (
        gradeNames[gradeNumber - 1] ||
        gradeNumber.toString()
    );
}
