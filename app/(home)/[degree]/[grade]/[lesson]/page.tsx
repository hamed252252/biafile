import { notFound } from "next/navigation";

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
    if (!params.degree || !params.grade || !params.lesson) {
        notFound();
    }

    return (
        <div className="container mx-auto py-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">
                    درس: {params.lesson}
                </h1>
                <p className="text-muted-foreground">
                    رشته: {params.degree} | پایه:{" "}
                    {params.grade}
                </p>
            </div>
            <div className="mt-8 prose prose-gray dark:prose-invert max-w-none">
                <p>محتوای درس اینجا قرار می‌گیرد.</p>
            </div>
        </div>
    );
}
