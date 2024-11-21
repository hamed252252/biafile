import React from "react";

interface LessonPageProps {
    params: Promise<{
        degree: string;
        grade: string;
        lesson: string;
    }>;
}

async function page({ params }: LessonPageProps) {
    const resolvedParams = await params; // Await the Promise to resolve `params`

    return (
        <div>
            <h1>Degree: {resolvedParams.degree}</h1>
            <h2>Grade: {resolvedParams.grade}</h2>
            <h3>Lesson: {resolvedParams.lesson}</h3>
        </div>
    );
}

export default page;
