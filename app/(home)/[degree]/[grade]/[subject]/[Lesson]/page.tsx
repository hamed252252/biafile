import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { LessonHeadingEntity } from "@/app/type/edcation";
import { BreadcrumbClient } from "@/app/componetns/breadcrumClinet";
import DetailsSectionClient from "@/app/componetns/DetailsSectionClient";
import { fetchDataLessonsClassData } from "@/app/lib/fetchdataLessonsClassData";

type RouteParams = {
    degree: string;
    grade: string;
    subject: string;
    Lesson: string;
};

/** اینترفیس ساده برای درخت دسته‌بندی‌ها */
interface CategoryEntity {
    id: number;
    title: string;
    uniqCode: string;
    subResultCategorys: CategoryEntity[];
    // می‌توانید فیلدهای دیگری هم اضافه کنید اگر لازم دارید
}

export default async function WorksheetDetail({
    params,
}: {
    params: Promise<RouteParams>; // Next.js 15+
}) {
    // 1) پارامترهای URL را await می‌کنیم
    const {
        degree,
        grade,
        subject,
        Lesson: lessonId,
    } = await params;

    // 2) داده‌ها را می‌خوانیم
    const { lessons, classData } =
        await fetchDataLessonsClassData();

    // 3) آرایه‌ها را تایپ می‌کنیم
    const categories =
        classData.entities as CategoryEntity[];
    const lessonList =
        lessons.entities as LessonHeadingEntity[];

    // 4) مسیر‌یابی درختی بدون any
    const degreeData = categories.find(
        (cat) => cat.uniqCode === degree
    );
    if (!degreeData) return null;

    const gradeData = degreeData.subResultCategorys.find(
        (gr) => gr.uniqCode === grade
    );
    if (!gradeData) return null;

    const subjectData = gradeData.subResultCategorys.find(
        (su) => su.uniqCode === subject
    );
    if (!subjectData) return null;

    // 5) پیدا کردن درس
    const lessonById = lessonList.find(
        (l) => l.id.toString() === lessonId
    );

    // 6) رندر UI
    return (
        <div
            className="min-h-screen bg-background"
            dir="rtl"
        >
            <div className="container mx-auto px-4 mt-4">
                <BreadcrumbClient
                    degreeId={degreeData.uniqCode}
                    degreeTitle={degreeData.title}
                    gradeId={gradeData.uniqCode}
                    GradeTitle={gradeData.title}
                    subjectId={subjectData.uniqCode}
                    subjectTitle={subjectData.title}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* پیش‌نمایش */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-[3/4] w-full">
                                    <Image
                                        src="/placeholder.svg"
                                        alt="Worksheet preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <p className="text-sm text-muted-foreground text-center">
                            پیش‌نمایش صفحهٔ اول فایل • تعداد
                            صفحات: ۴
                        </p>
                    </div>

                    {/* جزئیات */}
                    <div className="space-y-6">
                        <DetailsSectionClient
                            Lesson={lessonById}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
