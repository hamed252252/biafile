import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface Subject {
    name: string;
    icon: string;
    topics: string[];
}

const subjects: Subject[] = [
    {
        name: "ریاضیات",
        icon: "📐",
        topics: [
            "اعداد و محاسبات",
            "هندسه",
            "جبر",
            "آمار و احتمال",
        ],
    },
    {
        name: "علوم",
        icon: "🔬",
        topics: [
            "فیزیک",
            "شیمی",
            "زیست‌شناسی",
            "زمین‌شناسی",
        ],
    },
    {
        name: "فارسی",
        icon: "📚",
        topics: [
            "دستور زبان",
            "ادبیات",
            "نگارش",
            "روان‌خوانی",
        ],
    },
    {
        name: "مطالعات اجتماعی",
        icon: "🌍",
        topics: ["تاریخ", "جغرافیا", "مدنی", "اقتصاد"],
    },
    {
        name: "هنر",
        icon: "🎨",
        topics: ["نقاشی", "خوشنویسی", "کاردستی", "موسیقی"],
    },
    {
        name: "تربیت بدنی",
        icon: "⚽",
        topics: [
            "ورزش‌های توپی",
            "ژیمناستیک",
            "دو و میدانی",
            "شنا",
        ],
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

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8 text-right">
                {currentDegree.levelName} - پایه {gradeName}
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject) => (
                    <Card
                        key={subject.name}
                        className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <CardHeader className="pb-0">
                            <CardTitle className="text-right flex items-center justify-between">
                                <span>{subject.name}</span>
                                <span className="text-2xl">
                                    {subject.icon}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative h-40 mb-6">
                                <Image
                                    src={`/placeholder.svg?height=160&width=320&text=${encodeURIComponent(
                                        subject.name
                                    )}`}
                                    alt={subject.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-md"
                                />
                            </div>
                            <div className="space-y-4 mb-6">
                                <h3 className="text-xl font-semibold text-right">
                                    محتوای درس{" "}
                                    {subject.name}
                                </h3>
                                <h4 className="text-lg font-medium text-right text-gray-700">
                                    پایه {gradeName}{" "}
                                    {
                                        currentDegree.levelName
                                    }
                                </h4>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    {subject.topics.map(
                                        (topic, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                            >
                                                {topic}
                                            </Badge>
                                        )
                                    )}
                                </div>
                            </div>
                            <Link
                                href={`/${degree}/${grade}/${encodeURIComponent(
                                    subject.name
                                )}`}
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
