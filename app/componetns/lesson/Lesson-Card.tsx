"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";
import {
    BookOpen,
    Download,
    Share2,
    Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";

interface LessonEntity {
    id: string;
    title: string;
    slug: string;
    educationalGoals: string[];
    pricePDF: number;
    priceWord: number;
    pages: number;
    author: string;
    contributor: string;
}

interface GradeData {
    title: string;
    description: string;
}

interface GradeLessonProps {
    gradeSlug: string;
    degree: string;
    gradeData: GradeData;
    lessons: LessonEntity[];
}

export default function LessonBrowser({
    gradeSlug,
    degree,
    gradeData,
    lessons,
}: GradeLessonProps) {
    const router = useRouter();
    const [rating] = useState(5);

    return (
        <div
            className="min-h-screen bg-background"
            dir="rtl"
        >
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb Navigation */}
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="/"
                                className="hover:text-primary/75 hover:cursor-pointer"
                            >
                                صفحه اصلی
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href={`/${gradeSlug}`}
                                className="hover:text-primary/75 hover:cursor-pointer"
                            >
                                {gradeData.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <span className="text-foreground">
                                {degree}
                            </span>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold">
                            {gradeData.title}
                        </h1>
                        <p className="text-muted-foreground">
                            {gradeData.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map((lesson) => (
                            <Card
                                key={lesson.id}
                                className="overflow-hidden"
                            >
                                <CardContent className="p-0">
                                    <div className="space-y-4">
                                        {/* Preview Image */}
                                        <div className="relative aspect-[3/4] w-full">
                                            <Image
                                                src="/placeholder.svg"
                                                alt={
                                                    lesson.title
                                                }
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>

                                        {/* Lesson Content */}
                                        <div className="p-4 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-xl font-semibold">
                                                    {
                                                        lesson.title
                                                    }
                                                </h2>
                                                <div className="flex gap-1">
                                                    {[
                                                        ...Array(
                                                            rating
                                                        ),
                                                    ].map(
                                                        (
                                                            _,
                                                            i
                                                        ) => (
                                                            <Star
                                                                key={
                                                                    i
                                                                }
                                                                className="w-5 h-5 fill-primary text-primary"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">
                                                    اهداف
                                                    آموزشی:
                                                </h3>
                                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                                    {lesson.educationalGoals.map(
                                                        (
                                                            goal,
                                                            index
                                                        ) => (
                                                            <li
                                                                key={
                                                                    index
                                                                }
                                                            >
                                                                {
                                                                    goal
                                                                }
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        router.push(
                                                            `/lessons/${lesson.slug}`
                                                        )
                                                    }
                                                >
                                                    <Download className="ml-2 h-4 w-4" />
                                                    دانلود
                                                    PDF (
                                                    {lesson.pricePDF.toLocaleString()}{" "}
                                                    تومان)
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Download className="ml-2 h-4 w-4" />
                                                    دانلود
                                                    WORD (
                                                    {lesson.priceWord.toLocaleString()}{" "}
                                                    تومان)
                                                </Button>
                                            </div>

                                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                                                <span>
                                                    تعداد
                                                    صفحات:{" "}
                                                    {
                                                        lesson.pages
                                                    }
                                                </span>
                                                <span>
                                                    {
                                                        lesson.author
                                                    }{" "}
                                                    •{" "}
                                                    {
                                                        lesson.contributor
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
