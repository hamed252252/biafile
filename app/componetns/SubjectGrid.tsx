import { Subject } from "../type/edcation";
import SubjectCard from "./SubjectCard";

interface SubjectGridProps {
    subjects: Subject[];
    degree: string;
    grade: string;
    gradeName: string;
    currentDegreeName: string;
}

export default function SubjectGrid({
    subjects,
    degree,
    grade,
    gradeName,
    currentDegreeName,
}: SubjectGridProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
                <SubjectCard
                    key={subject.name}
                    subject={subject}
                    degree={degree}
                    grade={grade}
                    gradeName={gradeName}
                    currentDegreeName={currentDegreeName}
                />
            ))}
        </div>
    );
}
