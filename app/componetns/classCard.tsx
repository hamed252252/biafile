"use client";

import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlineVideoFile } from "react-icons/md";
import { LuTestTube } from "react-icons/lu";
import { TbPencilQuestion } from "react-icons/tb";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const icons = {
    sampleQuestion: FaRegQuestionCircle,
    educationalFile: MdOutlineVideoFile,
    QnA: TbPencilQuestion,
    onlineTest: LuTestTube,
};

type IconName = keyof typeof icons;

interface LessonLink {
    name: string;
    url: string;
}

interface Stat {
    label: string;
    value: number;
    iconName: IconName;
}

interface ClassCardProps {
    className: string;
    lastUpdatedDate: string;
    timeAgo: string;
    description?: string;
    stats: Stat[];
    lessons: LessonLink[];
    href: string;
}

const MotionCard = motion(Card);
const MotionBadge = motion(Badge);

export default function ClassCard({
    className,
    lastUpdatedDate,
    timeAgo,
    description,
    stats,
    lessons,
    href,
}: ClassCardProps) {
    return (
        <MotionCard
            className="overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-lg bg-blue-50 dark:bg-blue-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
        >
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold">
                    <Link
                        href={href}
                        className="hover:text-blue-200 transition-colors duration-200"
                    >
                        {className}
                    </Link>
                </CardTitle>
                <CardDescription className="mt-2 text-sm text-blue-100">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="text-sm text-blue-300 mb-4 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    آخرین بروزرسانی: {timeAgo}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {stats.map((stat, index) => {
                        const IconComponent =
                            icons[stat.iconName];
                        return (
                            <motion.div
                                key={index}
                                className="flex items-center space-x-2 text-sm bg-blue-200/20 p-2 rounded-lg shadow-md"
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor:
                                        "#B3D1FF",
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                }}
                            >
                                <IconComponent className="text-blue-700 h-5 w-5" />
                                <span className="text-blue-700">
                                    {stat.label}:{" "}
                                    <strong>
                                        {stat.value}
                                    </strong>
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
                <div className="flex flex-wrap gap-2">
                    {lessons.map((lesson, index) => (
                        <MotionBadge
                            key={index}
                            variant="secondary"
                            className="hover:bg-blue-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={lesson.url}
                                className="block px-2 py-1"
                            >
                                {lesson.name}
                            </Link>
                        </MotionBadge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-blue-200 to-blue-100 mt-4 rounded-b-lg">
                <Button
                    variant="outline"
                    className="w-full group flex justify-center border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition-all"
                    asChild
                >
                    <Link
                        href={href}
                        className="flex items-center justify-center"
                    >
                        دیدن جزپیات
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </motion.svg>
                    </Link>
                </Button>
            </CardFooter>
        </MotionCard>
    );
}
