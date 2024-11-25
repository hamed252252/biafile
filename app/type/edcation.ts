export interface Subject {
    name: string;
    icon: string;
    color: string;
}

export interface EducationalLevel {
    levelName: string;
    numberOfClasses: number;
    levelSlug: string;
}

export interface DegreeGradePageProps {
    degree: string;
    grade: string;
    currentDegree: EducationalLevel;
    gradeName: string;
}
