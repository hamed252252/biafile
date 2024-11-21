import ClassCard from "@/app/componetns/classCard";
import { notFound } from "next/navigation";

interface GradePageProps {
    params: {
        degree: string;
        grade: string;
    };
}

export default function GradePage({
    params,
}: GradePageProps) {
    if (!params.degree || !params.grade) {
        notFound();
    }

    // This would typically come from your database or API
    const classes = [
        {
            className: "ریاضی ۱",
            lastUpdatedDate: "2023-06-15",
            timeAgo: "۲ روز پیش",
            description: "مفاهیم پایه‌ای ریاضیات",
            stats: [
                {
                    label: "نمونه سوال",
                    value: 50,
                    iconName: "sampleQuestion" as const,
                },
                {
                    label: "فایل آموزشی",
                    value: 10,
                    iconName: "educationalFile" as const,
                },
                {
                    label: "پرسش و پاسخ",
                    value: 100,
                    iconName: "QnA" as const,
                },
                {
                    label: "آزمون آنلاین",
                    value: 5,
                    iconName: "onlineTest" as const,
                },
            ],
            lessons: [
                { name: "جبر", url: "/algebra" },
                { name: "هندسه", url: "/geometry" },
                { name: "مثلثات", url: "/trigonometry" },
            ],
            href: `/${params.degree}/${params.grade}/math-1`,
        },
        // Add more classes here...
    ];

    return (
        <div className="container mx-auto py-6">
            <div className="space-y-2 text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    پایه: {params.grade}
                </h1>
                <p className="text-muted-foreground">
                    رشته: {params.degree}
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((classInfo, index) => (
                    <ClassCard
                        key={index}
                        {...classInfo}
                    />
                ))}
            </div>
        </div>
    );
}
