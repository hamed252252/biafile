import React from "react";

interface LessonPageProps {
    params: Promise<{
        degree: string;
        grade: string;
        lesson: string;
    }>;
}

const LessonPage: React.FC<LessonPageProps> = async ({
    params,
}) => {
    const { degree, grade, lesson } = await params;
    return <div>{`${degree}/${grade}/${lesson}`}</div>;
};

export default LessonPage;
