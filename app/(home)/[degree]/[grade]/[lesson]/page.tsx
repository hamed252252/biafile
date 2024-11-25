import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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

interface Lesson {
    id: string;
    title: string;
    description: string;
    topics: string[];
    duration: string;
    difficulty: "آسان" | "متوسط" | "دشوار";
}

const lessons: Lesson[] = [
    {
        id: "lesson-1",
        title: "آشنایی با حروف الفبا",
        description:
            "در این درس با حروف الفبای فارسی آشنا می‌شویم.",
        topics: ["حروف الفبا", "تلفظ صحیح", "نوشتن حروف"],
        duration: "۴۵ دقیقه",
        difficulty: "آسان",
    },
    {
        id: "lesson-2",
        title: "کلمات ساده",
        description:
            "یادگیری ساخت کلمات ساده با استفاده از حروف آموخته شده.",
        topics: [
            "ترکیب حروف",
            "خواندن کلمات",
            "معنی کلمات",
        ],
        duration: "۶۰ دقیقه",
        difficulty: "متوسط",
    },
    {
        id: "lesson-3",
        title: "جمله‌سازی",
        description:
            "آموزش ساخت جملات ساده با استفاده از کلمات آموخته شده.",
        topics: ["ساختار جمله", "فعل و فاعل", "نقطه‌گذاری"],
        duration: "۷۵ دقیقه",
        difficulty: "دشوار",
    },
];

interface LessonPageProps {
    params: {
        degree: string;
        grade: string;
        lesson: string;
    };
}

export default function LessonPage({
    params,
}: LessonPageProps) {
    const { degree, grade, lesson } = params;

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
    const decodedLesson = decodeURIComponent(lesson);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8 text-right">
                {currentDegree.levelName} - پایه {gradeName}{" "}
                - درس {decodedLesson}
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {lessons.map((lesson) => (
                    <Card
                        key={lesson.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <CardHeader className="pb-0">
                            <CardTitle className="text-right flex items-center justify-between">
                                <span>{lesson.title}</span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        lesson.difficulty ===
                                        "آسان"
                                            ? "bg-green-100 text-green-800"
                                            : lesson.difficulty ===
                                              "متوسط"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {lesson.difficulty}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mb-6">
                                <p className="text-muted-foreground h-12 text-right">
                                    {lesson.description}
                                </p>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>
                                        مدت زمان:{" "}
                                        {lesson.duration}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    {lesson.topics.map(
                                        (topic, index) => (
                                            <span
                                                key={index}
                                                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                                            >
                                                {topic}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                            <Link
                                href={`/${degree}/${grade}/${encodeURIComponent(
                                    decodedLesson
                                )}/${lesson.id}`}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-full transition-colors"
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
