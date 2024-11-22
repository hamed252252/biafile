import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface EducationalLevel {
    levelName: string;
    numberOfClasses: number;
    levelSlug: string;
}

const educationalLevels: EducationalLevel[] = [
    {
        levelName: "ابتدایی",
        numberOfClasses: 6,
        levelSlug: "elementary",
    },
    {
        levelName: "متوسطه اول",
        numberOfClasses: 3,
        levelSlug: "middle",
    },
    {
        levelName: "متوسطه دوم",
        numberOfClasses: 3,
        levelSlug: "high",
    },
];

interface DegreePageProps {
    params: Promise<{
        degree: string;
    }>;
}

export default async function DegreePage({
    params,
}: DegreePageProps) {
    const result = await params;
    const { degree } = result;

    const currentDegree = educationalLevels.find(
        (level) => level.levelSlug === degree
    );

    if (!currentDegree) {
        return (
            <div className="container mx-auto py-10 text-center">
                <h1 className="text-3xl font-bold mb-6">
                    مقطع تحصیلی نامعتبر
                </h1>
                <p className="text-xl mb-4">
                    متأسفانه مقطع تحصیلی مورد نظر یافت نشد.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    بازگشت به صفحه اصلی
                </Link>
            </div>
        );
    }

    const grades = Array.from(
        { length: currentDegree.numberOfClasses },
        (_, i) => ({
            id: (i + 1).toString(),
            name: getGradeName(i + 1),
        })
    );

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-right">
                سیستم آموزشی ایران -{" "}
                {currentDegree.levelName}
            </h1>
            <div className="grid gap-6 md:grid-cols-3">
                {grades.map((grade) => (
                    <Card key={grade.id}>
                        <CardHeader>
                            <CardTitle className="text-right">
                                {grade.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4 text-right">
                                پایه {grade.name}{" "}
                                {currentDegree.levelName}
                            </p>
                            <Link
                                href={`/${degree}/${grade.id}`}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-full"
                            >
                                شروع یادگیری
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
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
