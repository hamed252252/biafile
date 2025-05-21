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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IconType } from "react-icons";
import { LessonLink, Stat } from "@/app/type/api-types";

export interface ClassCardProps {
    className: string;
    description?: string | null;
    stats?: Stat[];
    lastUpdate?: string;
    linkForSeeMore?: string;
    lessons?: LessonLink[];
}

const icons: Record<string, IconType> = {
    sampleQuestion: FaRegQuestionCircle,
    educationalFile: MdOutlineVideoFile,
    QnA: TbPencilQuestion,
    onlineTest: LuTestTube,
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const ClassCard: React.FC<ClassCardProps> = ({
    className,
    description,
    stats = [],
    lastUpdate = "امروز",
    linkForSeeMore = "/",
    lessons = [],
}) => (
    <TooltipProvider>
        <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
            className={cn(
                "relative flex flex-col min-h-[500px] w-full max-w-xs rounded-3xl",
                "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700",
                "shadow-lg overflow-visible transition-all"
            )}
        >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                <Badge className="rounded-full px-6 py-2 font-bold bg-primary/85 text-white shadow-md dark:bg-neutral-300 dark:text-black">
                    {className}
                </Badge>
            </div>

            <div className="p-5 space-y-3 mt-7 rtl">
                {stats.map(({ label, value, iconName }) => {
                    const Icon =
                        icons[iconName] ||
                        MdOutlineVideoFile;
                    return (
                        <div
                            key={label}
                            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
                        >
                            <Icon
                                className="w-4 h-4 flex-shrink-0"
                                aria-hidden="true"
                            />
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
                    <Clock
                        className="w-4 h-4 flex-shrink-0"
                        aria-hidden="true"
                    />
                    <span className="font-semibold">
                        آخرین بروزرسانی:
                    </span>
                    <span className="font-bold">
                        {lastUpdate}
                    </span>
                </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 mx-5 my-2" />

            <div className="flex flex-wrap gap-2 p-4 justify-center max-h-[150px] overflow-y-auto rtl">
                {lessons.length > 0 ? (
                    lessons.map(({ name, url }) => (
                        <Tooltip key={url}>
                            <TooltipTrigger asChild>
                                <Badge className="rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-xs px-3 py-1">
                                    <Link href={url}>
                                        {name}
                                    </Link>
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>مشاهده درس {name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                        هیچ درسی موجود نیست
                    </p>
                )}
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 mt-auto" />

            <div className="p-4 rtl">
                <Button
                    asChild
                    className="w-full rounded-xl bg-primary/85 dark:bg-neutral-200 text-white dark:text-black py-3 hover:scale-105 transition-all"
                >
                    <Link href={linkForSeeMore}>
                        <span className="flex items-center justify-center gap-2 font-semibold">
                            مشاهده جزئیات
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 rotate-180" // Rotate for RTL
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
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
    </TooltipProvider>
);

export default React.memo(ClassCard);
