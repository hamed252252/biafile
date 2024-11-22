import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface EducationalLevel {
    levelName: string;
    grades: number[];
    levelSlug: string;
}

const educationalLevels: EducationalLevel[] = [
    {
        levelName: "ابتدایی",
        grades: [1, 2, 3, 4, 5, 6],
        levelSlug: "elementary",
    },
    {
        levelName: "متوسطه اول",
        grades: [7, 8, 9],
        levelSlug: "middle",
    },
    {
        levelName: "متوسطه دوم",
        grades: [10, 11, 12],
        levelSlug: "high",
    },
];

const subjects = [
    "ریاضیات",
    "علوم",
    "فارسی",
    "مطالعات اجتماعی",
    "هنر",
    "تربیت بدنی",
];

interface DegreeGradeLessonPageProps {
    params: Promise<{
        degree: string;
        grade: string;
        lesson: string;
    }>;
}

export default async function DegreeGradeLessonPage({
    params,
}: DegreeGradeLessonPageProps) {
    const result = await params;
    const { degree, grade, lesson } = result;

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
        !currentDegree.grades.includes(gradeNumber)
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

    const decodedLesson = decodeURIComponent(lesson);
    if (!subjects.includes(decodedLesson)) {
        return (
            <div className="container mx-auto py-10 text-center">
                <h1 className="text-3xl font-bold mb-6">
                    درس نامعتبر
                </h1>
                <p className="text-xl mb-4">
                    متأسفانه درس مورد نظر یافت نشد.
                </p>
                <Link
                    href={`/${degree}/${grade}`}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    بازگشت به پایه{" "}
                    {getGradeName(gradeNumber)}
                </Link>
            </div>
        );
    }

    const gradeName = getGradeName(gradeNumber);

    const lessonContent = [
        {
            title: "مقدمه",
            content: "این بخش شامل مقدمه‌ای بر درس است.",
        },
        {
            title: "اهداف یادگیری",
            content:
                "در این بخش، اهداف یادگیری درس مشخص شده است.",
        },
        {
            title: "محتوای اصلی",
            content: "این بخش شامل محتوای اصلی درس است.",
        },
        {
            title: "تمرین‌ها",
            content:
                "در این بخش، تمرین‌های مرتبط با درس ارائه شده است.",
        },
        {
            title: "خلاصه",
            content:
                "این بخش خلاصه‌ای از مطالب مهم درس را ارائه می‌دهد.",
        },
    ];

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-right">
                {currentDegree.levelName} - پایه {gradeName}{" "}
                - درس {decodedLesson}
            </h1>
            <div className="grid gap-6 md:grid-cols-2">
                {lessonContent.map((section) => (
                    <Card key={section.title}>
                        <CardHeader>
                            <CardTitle className="text-right">
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-right">
                                {section.content}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-right">
                <Link
                    href={`/${degree}/${grade}`}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    بازگشت به لیست دروس
                </Link>
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
