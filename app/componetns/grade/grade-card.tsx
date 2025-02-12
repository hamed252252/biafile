"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { ChevronLeft, BookOpen } from "lucide-react";

import type React from "react";
import type { Lesson } from "@/app/type/edcation";

interface GradeCardProps {
    degree: string;
    gradeSlug: string;
    gradeData: GradeData;
    lessons: Lesson[];
}

interface GradeData {
    id: number;
    title: string;
    description: string | null;
    subResultCategorys: {
        id: number;
        title: string;
        uniqCode: string;
    }[];
}

const GradeCard: React.FC<GradeCardProps> = ({
    degree,
    gradeData,
    lessons,
    gradeSlug,
}) => {
    return (
        <div
            dir="rtl"
            className="container mx-auto p-4 rtl"
        >
            <Card className="mb-8 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <CardHeader className="bg-gradient-to-l from-primary to-primary-foreground text-white p-8">
                    <CardTitle className="text-3xl font-bold mb-4">
                        {gradeData.title}
                    </CardTitle>
                    {gradeData.description && (
                        <div
                            className="text-gray-100 text-lg"
                            dangerouslySetInnerHTML={{
                                __html: gradeData.description,
                            }}
                        />
                    )}
                </CardHeader>
                <CardContent className="p-6">
                    <Tabs
                        dir="rtl"
                        defaultValue={
                            gradeData.subResultCategorys[0]
                                ?.uniqCode
                        }
                        className="w-full"
                    >
                        <TabsList className="flex justify-start overflow-x-auto overflow-y-hidden mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                            {gradeData.subResultCategorys.map(
                                (subCategory) => (
                                    <TabsTrigger
                                        key={subCategory.id}
                                        value={
                                            subCategory.uniqCode
                                        }
                                        className="px-4 py-2 text-sm font-medium rounded-md"
                                    >
                                        {subCategory.title}
                                        <h1></h1>
                                    </TabsTrigger>
                                )
                            )}
                        </TabsList>
                        {gradeData.subResultCategorys.map(
                            (subCategory) => (
                                <TabsContent
                                    dir="rtl"
                                    key={subCategory.id}
                                    value={
                                        subCategory.uniqCode
                                    }
                                >
                                    <h4 className="text-2xl font-semibold mb-6 text-primary border-r-4 border-primary pr-4">
                                        <Link
                                            href={`${gradeSlug}/${subCategory.uniqCode}`}
                                        >
                                            {
                                                subCategory.title
                                            }
                                        </Link>
                                    </h4>
                                    <ScrollArea
                                        dir="rtl"
                                        className="h-[calc(100vh-350px)]"
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {lessons
                                                .filter(
                                                    (
                                                        lesson
                                                    ) =>
                                                        lesson.categoryID ===
                                                        subCategory.id
                                                )
                                                .map(
                                                    (
                                                        lesson
                                                    ) => (
                                                        <LessonCard
                                                            key={
                                                                lesson.id
                                                            }
                                                            subject={
                                                                subCategory.uniqCode
                                                            }
                                                            lesson={
                                                                lesson
                                                            }
                                                            degree={
                                                                degree
                                                            }
                                                            gradeSlug={
                                                                gradeSlug
                                                            }
                                                        />
                                                    )
                                                )}
                                        </div>
                                    </ScrollArea>
                                </TabsContent>
                            )
                        )}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

interface LessonCardProps {
    lesson: Lesson;
    degree: string;
    gradeSlug: string;
    subject: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
    subject,
    lesson,
    degree,
    gradeSlug,
}) => {
    return (
        <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
            <div className="relative w-full h-48 overflow-hidden">
                {lesson.imageUIrl ? (
                    <Image
                        src={
                            lesson.imageUIrl ||
                            "/placeholder.svg"
                        }
                        alt={lesson.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                )}
            </div>
            <CardHeader>
                <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {lesson.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <div
                    className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{
                        __html: lesson.shortDescription,
                    }}
                />
            </CardContent>
            <CardFooter className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                    href={`/${degree}/${gradeSlug}/${subject}/${lesson.id}`}
                    passHref
                    className="w-full"
                >
                    <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors duration-300 justify-between">
                        <span>مشاهده درس</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default GradeCard;
