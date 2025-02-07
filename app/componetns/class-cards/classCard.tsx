"use client";

import { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";

const icons = {
    sampleQuestion: FaRegQuestionCircle,
    educationalFile: MdOutlineVideoFile,
    QnA: TbPencilQuestion,
    onlineTest: LuTestTube,
};

type IconName = keyof typeof icons;

export interface LessonLink {
    name?: string;
    url?: string;
}

export interface Stat {
    label?: string;
    value?: number;
    iconName?: IconName;
}

interface ClassCardProps {
    className?: string;
    lastUpdatedDate?: string;
    timeAgo?: string | number;
    description?: string | null;
    stats?: Readonly<Stat[]>;
    lessons?: LessonLink[];
    LinkForSeeMore?: string;
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
    LinkForSeeMore,
    href,
    image,
}: ClassCardProps) {
    const [color, setColor] = useState("");

    useEffect(() => {
        const randomColor = `rgb(${Math.floor(
            Math.random() * 256
        )}, ${Math.floor(
            Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`;
        setColor(randomColor);
    }, []);

    return (
        <MotionCard
            className="relative overflow-hidden  transition-all duration-300 rounded-lg bg-card text-card-foreground shadow-lg hover:shadow-xl border border-border h-[500px] flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
        >
            <CardHeader className="p-4 text-center relative">
                <div className="absolute inset-x-0 z-10 top-0  h-32 bg-sky-50 dark:bg-muted  rounded-b-[25%]" />
                <CardTitle className=" text-2xl  font-semibold z-20">
                    <Badge
                        style={{
                            backgroundColor: color,
                        }}
                        className="  text-black p-2"
                    >
                        <Link
                            href={href ?? "/default-url"}
                            className={cn(
                                "hover:text-primary  transition-colors  duration-200"
                            )}
                        >
                            {className}
                        </Link>
                    </Badge>
                </CardTitle>

                <CardDescription className="mt-1 text-sm text-gray-600 z-20">
                    {description ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: description + "",
                            }}
                        ></div>
                    ) : (
                        ""
                    )}
                </CardDescription>
            </CardHeader>

            <CardContent className="p-4 mt-2 flex-grow overflow-auto z-20 ">
                <div className="absolute top-20 ">
                    <div className="text-sm mb-4  flex items-center text-accent-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mx-2"
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
                        <span className="ml-1  ">
                            آخرین بروزرسانی:
                        </span>
                        {timeAgo !== undefined &&
                            localizeNumber(timeAgo)}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-2 my-2 mt-10">
                    {stats?.map((stat, index) => {
                        const IconComponent =
                            stat.iconName &&
                            icons[stat.iconName]
                                ? icons[stat.iconName]
                                : FaRegQuestionCircle;

                        return (
                            <motion.div
                                key={stat.iconName}
                                className="flex items-center space-x-2 text-sm p-2 rounded-lg bg-muted hover:text-primary"
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                }}
                            >
                                {IconComponent ? (
                                    <IconComponent
                                        className="h-5 w-5 mx-2"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <span>
                                        Icon not found
                                    </span>
                                )}
                                <span>
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

            <CardFooter className="p-4  mt-auto border-none shadow-none">
                <Button
                    variant="outline"
                    className="w-full group flex justify-center border-none shadow-none  hover:text-primary transition-all"
                    asChild
                >
                    <Link
                        href={
                            LinkForSeeMore ?? "/default-url"
                        }
                        className="flex items-center justify-center dark:bg-primary-foreground  dark:text-primary"
                        aria-label={`View details about ${className}`}
                    >
                        دیدن جزپیات
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:translate-x-1"
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
