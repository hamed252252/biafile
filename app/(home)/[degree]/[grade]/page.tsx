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

interface DegreeGradePageProps {
    params: Promise<{
        degree: string;
        grade: string;
    }>;
}

export default async function DegreeGradePage({
    params,
}: DegreeGradePageProps) {
    const result = await params;
    const { degree, grade } = result;

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

    const gradeNumber = parseInt(grade, 10);
    if (
        isNaN(gradeNumber) ||
        gradeNumber < 1 ||
        gradeNumber > currentDegree.numberOfClasses
    ) {
        return (
            <div className="container mx-auto py-10 text-center">
                <h1 className="text-3xl font-bold mb-6">
                    پایه تحصیلی نامعتبر
                </h1>
                <p className="text-xl mb-4">
                    متأسفانه پایه تحصیلی مورد نظر یافت نشد.
                </p>
                <Link
                    href={`/${degree}`}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    بازگشت به مقطع {currentDegree.levelName}
                </Link>
            </div>
        );
    }

    const gradeName = getGradeName(gradeNumber);

    const subjects = [
        "ریاضیات",
        "علوم",
        "فارسی",
        "مطالعات اجتماعی",
        "هنر",
        "تربیت بدنی",
    ];

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-right">
                {currentDegree.levelName} - پایه {gradeName}
            </h1>
            <div className="grid gap-6 md:grid-cols-3">
                {subjects.map((subject) => (
                    <Card key={subject}>
                        <CardHeader>
                            <CardTitle className="text-right">
                                {subject}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4 text-right">
                                محتوای درس {subject} برای
                                پایه {gradeName}{" "}
                                {currentDegree.levelName}
                            </p>
                            <Link
                                href={`/${degree}/${grade}/${encodeURIComponent(
                                    subject
                                )}`}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-full"
                            >
                                مشاهده درس
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
