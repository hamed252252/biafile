"use client";

import React from "react";
import Image from "next/image";
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
    name?: string;
    url?: string;
}

interface Stat {
    label?: string;
    value?: number;
    iconName?: IconName;
}

interface ClassCardProps {
    className?: string;
    lastUpdatedDate?: string;
    timeAgo?: string;
    description?: string | null;
    stats?: Readonly<Stat[]>;
    lessons?: LessonLink[];
    href?: string;
    image?: string | null;
}

const MotionCard = motion(Card);
const MotionBadge = motion(Badge);

const localizeNumber = (num: number | string) =>
    num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

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
    image,
}: ClassCardProps) {
    return (
        <MotionCard
            className="relative overflow-hidden transition-all duration-300 rounded-lg bg-card text-card-foreground shadow-lg hover:shadow-xl border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
        >
            {/* Image Section */}
            <div className="relative w-full h-48">
                <Image
                    src={
                        image ??
                        "/path/to/fallback-image.jpg"
                    }
                    alt={`${className} cover`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
            </div>

            {/* Header Section */}
            <CardHeader className="relative p-4 -mt-20 text-center z-10">
                <CardTitle className="text-2xl font-semibold flex justify-center text-center text-white">
                    <Link
                        href={href ?? "/default-url"}
                        className="hover:text-primary transition-colors duration-200"
                    >
                        {localizeNumber(
                            className ??
                                "Default Class Name"
                        )}
                    </Link>
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-gray-200">
                    {description
                        ? localizeNumber(description)
                        : ""}
                </CardDescription>
            </CardHeader>

            {/* Stats Section */}
            <CardContent className="p-4">
                <div className="text-sm mb-4 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="ml-1">
                        آخرین بروزرسانی:
                    </span>
                    {/* {localizeNumber(timeAgo)} */}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {stats?.map((stat, index) => {
                        const IconComponent =
                            icons[stat.iconName];
                        return (
                            <motion.div
                                key={index}
                                className="flex items-center space-x-2 text-sm p-2 rounded-lg bg-muted hover:text-primary"
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                }}
                            >
                                <IconComponent
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
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

                {/* Lessons Section */}
                <div className="flex flex-wrap gap-2">
                    {lessons?.map((lesson, index) => (
                        <MotionBadge
                            key={index}
                            variant="secondary"
                            className="hover:bg-primary/20 hover:text-primary transition-all duration-300 ease-in-out transform hover:scale-105"
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={
                                    lesson.url ??
                                    "/default-url"
                                }
                                className="block px-2 py-1"
                            >
                                {lesson.name}
                            </Link>
                        </MotionBadge>
                    ))}
                </div>
            </CardContent>

            {/* Footer Section */}
            <CardFooter className="p-4 bg-muted rounded-b-lg">
                <Button
                    variant="secondary"
                    className="w-full group flex justify-center bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                    asChild
                >
                    <Link
                        href={href ?? "/default-url"}
                        className="flex items-center justify-center dark:bg-primary dark:text-muted"
                        aria-label={`View details about ${className}`}
                    >
                        دیدن جزپیات
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5l7 7-7 7"
                            />
                        </motion.svg>
                    </Link>
                </Button>
            </CardFooter>
        </MotionCard>
    );
}
