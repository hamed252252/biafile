import Image from "next/image";
import {
    Star,
    Download,
    Share2,
    BookOpen,
    Users,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbClient } from "@/app/componetns/breadcrumClinet";
import DetailsSectionClient from "@/app/componetns/DetailsSectionClient";
import { fetchDataLessonsClassData } from "../../page";

type WorksheetDetailProps = {
    params: Promise<{
        degree: string;
        grade: string;
        subject: string;
        Lesson: string;
    }>;
};

export default async function WorksheetDetail({
    params,
}: WorksheetDetailProps) {
    const { degree, grade, subject, Lesson } = await params;
    const previewImage =
        "/placeholder.svg?height=600&width=400";
    const res = await params;
    const { lessons, classData } =
        await fetchDataLessonsClassData();

    const filteredData = classData.entities.find(
        (item) => item.uniqCode === degree
    );
    if (!filteredData) {
        console.error(
            `Degree with uniqCode ${degree} not found.`
        );
        return null;
    }

    const gradeData = filteredData.subResultCategorys.find(
        (item) => item.uniqCode === grade
    );
    if (!gradeData) {
        console.error(
            `Grade with uniqCode ${grade} not found.`
        );
        return null;
    }

    const subjectData = gradeData.subResultCategorys.find(
        (item) => item.uniqCode === subject
    );
    if (!subjectData) {
        console.error(
            `Subject with uniqCode ${subject} not found.`
        );
        return null;
    }

    const filteredLessons = lessons.entities.filter(
        (item) => item.categoryID === subjectData.id
    );
    const LessonById = lessons.entities.find(
        (item) => item.id.toString() === Lesson
    );

    return (
        <div
            className="min-h-screen bg-background"
            dir="rtl"
        >
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <BreadcrumbClient
                    degreeId={filteredData.uniqCode}
                    degreeTitle={filteredData.title}
                    gradeId={gradeData.uniqCode}
                    GradeTitle={gradeData.title}
                    subjectId={subjectData.uniqCode}
                    subjectTitle={subjectData.title}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                    {/* Preview Section */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-[3/4] w-full">
                                    <Image
                                        src={previewImage}
                                        alt="پیش‌نمایش کاربرگ"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <p className="text-sm text-muted-foreground text-center">
                            پیش‌نمایش صفحه اول فایل • تعداد
                            صفحات: ۴
                        </p>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <DetailsSectionClient
                            Lesson={LessonById}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
