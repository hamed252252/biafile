import React from "react";

interface PageProps {
    params: Promise<{
        degree: string;
        grade: string;
    }>;
}

const GradePage: React.FC<PageProps> = async ({
    params,
}) => {
    const { degree, grade } = await params; // Destructure the dynamic segments
    console.log(
        `This is degree: ${degree} and this is grade: ${grade}`
    );

    return (
        <div>
            Degree: {degree}
            <br />
            and Grade: {grade}
        </div>
    );
};

export default GradePage;
