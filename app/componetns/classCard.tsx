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

// Function to localize numbers to Persian
const localizeNumber = (num: number | string) =>
    num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

const MotionCard = motion(Card);
const MotionBadge = motion(Badge);

const localizeDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

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
            className="relative overflow-hidden transition-all duration-300 rounded-lg bg-white shadow-lg hover:shadow-xl border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
        >
            <CardHeader className="relative p-4 bg-blue-50 rounded-t-lg text-center">
                <CardTitle className="text-lg font-semibold text-black flex justify-center text-center">
                    <Link
                        href={href}
                        className="hover:text-blue-500 transition-colors duration-200"
                    >
                        {localizeNumber(className)}
                    </Link>
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-slate-700">
                    {description
                        ? localizeNumber(description)
                        : ""}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="text-sm text-black mb-4 flex items-center">
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
                    <span className="text-black ml-1">
                        آخرین بروزرسانی:
                    </span>
                    {localizeNumber(timeAgo)}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {stats.map((stat, index) => {
                        const IconComponent =
                            icons[stat.iconName];
                        return (
                            <motion.div
                                key={index}
                                className="flex items-center space-x-2 text-sm p-2 rounded-lg bg-blue-100/20 hover:text-sky-600 text-black"
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                }}
                            >
                                <IconComponent className="h-5 w-5" />
                                <span>
                                    {stat.label}:{" "}
                                    <strong>
                                        {localizeNumber(
                                            stat.value
                                        )}
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
                            className="hover:bg-blue-200 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 bg-blue-100 text-black"
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
            <CardFooter className="p-4 bg-blue-50 rounded-b-lg">
                <Button
                    variant="outline"
                    className="w-full group flex justify-center border-blue-300 text-black hover:bg-blue-500 hover:text-white transition-all"
                    asChild
                >
                    <Link
                        href={href}
                        className="flex items-center justify-center"
                    >
                        دیدن جزپیات
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
