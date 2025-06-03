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

interface CategoryEntity {
    id: number;
    title: string;
    uniqCode: string;
    slug?: string | null;
    subResultCategorys: CategoryEntity[];
}

// ✅ تابع بررسی slug یا uniqCode
const matchesSlug = (
    routeParam: string,
    entity: { slug?: string | null; uniqCode: string }
): boolean => entity.slug === routeParam || entity.uniqCode === routeParam;

export default async function WorksheetDetail({
    params,
}: {
    params: Promise<RouteParams>;
}) {
    const {
        degree,
        grade,
        subject,
        Lesson: lessonId,
    } = await params;

    const { lessons, classData } =
        await fetchDataLessonsClassData();

    const categories = classData.entities as CategoryEntity[];
    const lessonList = lessons.entities as LessonHeadingEntity[];

    // استفاده از matchesSlug
    const degreeData = categories.find((cat) =>
        matchesSlug(degree, cat)
    );
    if (!degreeData) return null;

    const gradeData = degreeData.subResultCategorys.find((gr) =>
        matchesSlug(grade, gr)
    );
    if (!gradeData) return null;

    const subjectData = gradeData.subResultCategorys.find((su) =>
        matchesSlug(subject, su)
    );
    if (!subjectData) return null;

    const lessonById = lessonList.find(
        (l) => l.id.toString() === lessonId
        
    );

    return (
        <div className="min-h-screen bg-background" dir="rtl">
            <div className="container mx-auto px-4 mt-4">
                <BreadcrumbClient
                    degreeId={degreeData.slug || degreeData.uniqCode}
                    degreeTitle={degreeData.title}
                    gradeId={gradeData.slug || gradeData.uniqCode}
                    GradeTitle={gradeData.title}
                    subjectId={subjectData.slug || subjectData.uniqCode}
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
                            پیش‌نمایش صفحهٔ اول فایل • تعداد صفحات: ۴
                        </p>
                    </div>

                    {/* جزئیات */}
                    <div className="space-y-6">
                        <DetailsSectionClient Lesson={lessonById} />
                    </div>
                </div>
            </div>
        </div>
    );
}
