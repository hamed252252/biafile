import { ApiResponseCategorysCategorys } from "@/app/componetns/class-cards/nested-cards";
import GradeCard from "@/app/componetns/grade/grade-card";
import { ApiResponseLessonHeading } from "@/app/type/edcation";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
    params: {
        degree: string;
        grade: string;
    };
}

export async function fetchDataLessonsClassData() {
    const [lessonsResponse, classDataResponse] =
        await Promise.all([
            fetch(
                "https://api.biafile.ir/Api/LessonHeadings/AllForPublicPage"
            ),
            fetch(
                "https://api.biafile.ir/Api/Categorys/Public"
            ),
        ]);

    if (!lessonsResponse.ok || !classDataResponse.ok) {
        throw new Error("Failed to fetch data");
    }

    const lessons: ApiResponseLessonHeading =
        await lessonsResponse.json();
    const classData: ApiResponseCategorysCategorys =
        await classDataResponse.json();

    return { lessons, classData };
}

export async function generateStaticParams() {
    const { classData, lessons } =
        await fetchDataLessonsClassData();

    return classData.entities.flatMap((item) =>
        item.subResultCategorys.map((subitem) => ({
            degree: item.uniqCode,
            grade: subitem.uniqCode,
        }))
    );
}

const GradePage = async ({ params }: PageProps) => {
    const { degree, grade } = await params;

    const { lessons, classData } =
        await fetchDataLessonsClassData();

    const filteredData = classData.entities.find(
        (item) => item.uniqCode === degree
    );

    if (!filteredData) {
        return notFound();
    }

    const gradeData = filteredData.subResultCategorys.find(
        (subitem) => subitem.uniqCode === grade
    );

    if (!gradeData) {
        return notFound();
    }

    const LessonEntitys = lessons.entities;
    return (
        <GradeCard
            gradeSlug={grade}
            degree={degree}
            gradeData={gradeData}
            lessons={LessonEntitys}
        />
    );
};

export default GradePage;
