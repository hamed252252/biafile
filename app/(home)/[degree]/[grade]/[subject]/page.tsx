import React from "react";
import { fetchDataLessonsClassData } from "../page";
import SubjectCard from "@/app/componetns/subject/subject-card";

interface SubjectPageProps {
    params: Promise<{
        degree: string;
        grade: string;
        subject: string;
    }>;
}

const SubjectPage: React.FC<SubjectPageProps> = async ({
    params,
}) => {
    const { degree, grade, subject } = await params;
    const { lessons, classData } =
        await fetchDataLessonsClassData();

    const filteredData = classData.entities.find(
        (item) => item.uniqCode === degree
    );
    if (!filteredData) {
        console.error(
            `Degree with uniqCode ${degree} not found.`
        );
        return null;
    }

    const gradeData = filteredData.subResultCategorys.find(
        (item) => item.uniqCode === grade
    );
    if (!gradeData) {
        console.error(
            `Grade with uniqCode ${grade} not found.`
        );
        return null;
    }

    const subjectData = gradeData.subResultCategorys.find(
        (item) => item.uniqCode === subject
    );
    if (!subjectData) {
        console.error(
            `Subject with uniqCode ${subject} not found.`
        );
        return null;
    }

    const filteredLessons = lessons.entities.filter(
        (item) => item.categoryID === subjectData.id
    );

    return (
        <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((item) => (
                <SubjectCard
                    key={item.id}
                    title={item.title}
                    status={
                        item.resultLessonHeadingStatus.title
                    }
                    tags={item.resultJsonLables.map(
                        (label) => label.text
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
};

export default SubjectPage;
export async function generateStaticParams() {
    const { classData } = await fetchDataLessonsClassData();

    return classData.entities.flatMap((degree) =>
        degree.subResultCategorys?.flatMap((grade) =>
            grade.subResultCategorys?.map((subject) => ({
                degree: degree.uniqCode,
                grade: grade.uniqCode,
                subject: subject.uniqCode,
            }))
        )
    );
}
