import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Subject } from "../type/edcation";

interface SubjectCardProps {
    subject: Subject;
    degree: string;
    grade: string;
    gradeName: string;
    currentDegreeName: string;
}

export default function SubjectCard({
    subject,
    degree,
    grade,
    gradeName,
    currentDegreeName,
}: SubjectCardProps) {
    return (
        <Link
            href={`/${degree}/${grade}/${encodeURIComponent(
                subject.name
            )}`}
            passHref
        >
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>{subject.name}</span>
                        <Badge
                            style={{
                                backgroundColor:
                                    subject.color,
                            }}
                        >
                            {subject.icon}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        {currentDegreeName} - پایه{" "}
                        {gradeName}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
