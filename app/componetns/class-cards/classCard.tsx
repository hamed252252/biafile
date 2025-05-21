"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdOutlineVideoFile } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { TbPencilQuestion } from "react-icons/tb";
import { LuTestTube } from "react-icons/lu";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

export type IconName =
    | "sampleQuestion"
    | "educationalFile"
    | "QnA"
    | "onlineTest";

export interface Stat {
    label: string;
    value: number;
    iconName: IconName;
}

export interface LessonLink {
    name: string;
    url: string;
}

export interface ClassCardProps {
    className: string;
    description?: string | null;
    stats?: Stat[];
    lastUpdate?: string;
    linkForSeeMore?: string;
    lessons?: LessonLink[];
}

const icons: Record<IconName, IconType> = {
    sampleQuestion: FaRegQuestionCircle,
    educationalFile: MdOutlineVideoFile,
    QnA: TbPencilQuestion,
    onlineTest: LuTestTube,
};

const ClassCard: React.FC<ClassCardProps> = ({
    className,
    description,
    stats = [],
    lastUpdate = "",
    linkForSeeMore = "/",
    lessons = [],
}) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className={cn(
            "relative flex flex-col min-h-[500px] w-full max-w-xs rounded-3xl",
            "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700",
            "shadow-lg overflow-visible transition-all"
        )}
    >
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
            <Badge className="rounded-full px-6 py-2 font-bold bg-neutral-800 text-white shadow-md dark:bg-neutral-300 dark:text-black">
                {className}
            </Badge>
        </div>

        <div className="p-5 space-y-3 mt-7">
            {stats.map(({ label, value, iconName }) => {
                const Icon = icons[iconName];
                return (
                    <div
                        key={label}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
                    >
                        <Icon className="w-4 h-4" />
                        <span className="font-semibold">
                            {label}:
                        </span>
                        <span className="font-bold">
                            {value}
                        </span>
                    </div>
                );
            })}

            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">
                    آخرین بروزرسانی:
                </span>
                <span className="font-bold">
                    {lastUpdate}
                </span>
            </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-600 mx-5 my-2" />

        <div className="flex flex-wrap gap-2 p-4 justify-center max-h-[150px] overflow-y-auto">
            {lessons.map(({ name, url }) => (
                <Badge
                    key={url}
                    className="rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-xs px-3 py-1"
                >
                    <Link href={url}>{name}</Link>
                </Badge>
            ))}
        </div>

        <div className="border-t border-gray-300 dark:border-gray-600 mt-auto" />

        <div className="p-4">
            <Button
                asChild
                className="w-full rounded-xl bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black py-3 hover:opacity-90 transition-all"
            >
                <Link href={linkForSeeMore}>
                    <span className="flex items-center justify-center gap-2 font-semibold">
                        مشاهده جزئیات
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
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
                        </svg>
                    </span>
                </Link>
            </Button>
        </div>
    </motion.div>
);

export default ClassCard;
