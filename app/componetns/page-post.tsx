"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    Calendar,
    Clock,
    User,
    Share2,
    Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Post {
    title: string;
    author: string;
    date: string;
    readingTime: number;
    coverImage: string;
    content: string;
    excerpt: string;
}

interface PostPageProps {
    post: Post;
}

interface Heading {
    id: string;
    text: string | null;
    level: number;
}

const extractHeadings = (
    htmlContent: string
): { headings: Heading[]; updatedContent: string } => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
        htmlContent,
        "text/html"
    );
    const headings = Array.from(
        doc.querySelectorAll("h2, h3")
    ).map((heading) => {
        const id =
            heading.textContent
                ?.replace(/\s+/g, "-")
                .toLowerCase() || "";
        heading.id = id;
        return {
            id,
            text: heading.textContent,
            level: parseInt(heading.tagName.substring(1)),
        };
    });

    return { headings, updatedContent: doc.body.innerHTML };
};

export default function PostPage({ post }: PostPageProps) {
    const [activeHeading, setActiveHeading] =
        useState<string>("");
    const [isMenuOpen, setIsMenuOpen] =
        useState<boolean>(false);
    const { headings, updatedContent } = extractHeadings(
        post.content || ""
    );

    useEffect(() => {
        const handleScroll = () => {
            const offsets = headings.map((heading) => ({
                id: heading.id,
                offset:
                    document
                        .getElementById(heading.id)
                        ?.getBoundingClientRect().top ??
                    Infinity,
            }));

            const active = offsets.reduce(
                (closest, current) =>
                    Math.abs(current.offset) <
                    Math.abs(closest.offset)
                        ? current
                        : closest
            );

            setActiveHeading(active.id);
        };

        window.addEventListener("scroll", handleScroll);
        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
    }, [headings]);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        section?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        setIsMenuOpen(false);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                });
                toast({
                    title: "اشتراک‌گذاری موفق",
                    description:
                        "محتوا با موفقیت به اشتراک گذاشته شد.",
                });
            } catch (error) {
                console.error("Error sharing:", error);
                toast({
                    title: "خطا در اشتراک‌گذاری",
                    description:
                        "مت‌أسفانه مشکلی در اشتراک‌گذاری پیش آمد.",
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "اشتراک‌گذاری",
                description:
                    "لطفاً لینک صفحه را کپی و به اشتراک بگذارید.",
            });
        }
    };

    const handleReportError = () => {
        toast({
            title: "گزارش خطا",
            description:
                "از گزارش شما متشکریم. تیم ما به زودی آن را بررسی خواهد کرد.",
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            <aside className="lg:sticky lg:top-20 h-fit bg-muted rounded-lg shadow-lg p-4">
                <div
                    className={cn("space-y-4", {
                        hidden: !isMenuOpen,
                        "lg:block": true,
                    })}
                >
                    <h2 className="text-lg font-semibold">
                        در این صفحه
                    </h2>
                    <nav>
                        <ul className="space-y-2">
                            {headings.map((heading) => (
                                <li key={heading.id}>
                                    <Button
                                        onClick={() => {
                                            scrollToSection(
                                                heading.id
                                            );
                                            setIsMenuOpen(
                                                false
                                            );
                                        }}
                                        variant="ghost"
                                        className={cn(
                                            "text-sm justify-start w-full",
                                            activeHeading ===
                                                heading.id
                                                ? "text-primary font-medium"
                                                : "text-muted-foreground hover:text-foreground",
                                            heading.level ===
                                                3 && "pl-4"
                                        )}
                                    >
                                        {heading.text}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
            <div className="lg:col-span-2 bg-background rounded-lg shadow-lg p-6">
                <div className="mb-6 space-y-4">
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.date}>
                                {post.date}
                            </time>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                                {post.readingTime} دقیقه
                                مطالعه
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={handleShare}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Share2 className="h-4 w-4" />
                            اشتراک‌گذاری
                        </Button>
                        <Button
                            onClick={handleReportError}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Flag className="h-4 w-4" />
                            گزارش خطا
                        </Button>
                    </div>
                </div>
                <div
                    className="prose prose-blue dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: updatedContent || "",
                    }}
                />
            </div>
        </div>
    );
}
