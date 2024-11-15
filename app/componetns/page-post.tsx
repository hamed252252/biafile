"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { Post } from "@/app/lib/mockData"; // Adjust path as needed

interface PostPageProps {
    post: Post;
}

// Utility function to extract headings and update content with IDs
const extractHeadings = (
    htmlContent: string
): {
    headings: {
        id: string;
        text: string | null;
        level: number;
    }[];
    updatedContent: string;
} => {
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
        heading.id = id; // Assign id to the heading for anchor linking
        return {
            id,
            text: heading.textContent,
            level: parseInt(heading.tagName.substring(1)),
        };
    });

    // Update the HTML with assigned IDs
    const updatedContent = doc.body.innerHTML;

    return { headings, updatedContent };
};

export default function PostPage({ post }: PostPageProps) {
    const [activeHeading, setActiveHeading] =
        useState<string>("");

    // Extract headings and updated content
    const { headings, updatedContent } = extractHeadings(
        post.content || ""
    );

    useEffect(() => {
        const handleScroll = () => {
            const offsets = headings.map((heading) => {
                const element = document.getElementById(
                    heading.id
                );
                return {
                    id: heading.id,
                    offset: element
                        ? element.getBoundingClientRect()
                              .top
                        : Infinity,
                };
            });

            const active = offsets.reduce(
                (closest, current) =>
                    Math.abs(current.offset) <
                    Math.abs(closest.offset)
                        ? current
                        : closest
            );

            setActiveHeading(active.id || "");
        };

        window.addEventListener("scroll", handleScroll);
        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
    }, [headings]);

    // Smooth scroll to section
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Content */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                {/* Blog Header */}
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
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
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
                </div>
                <div
                    className="prose prose-blue dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: updatedContent || "",
                    }}
                />
            </div>

            {/* Table of Contents */}
            <aside className="hidden lg:block bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-4 sticky top-20">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    در این صفحه
                </h2>
                <ul className="space-y-2">
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <button
                                onClick={() =>
                                    scrollToSection(
                                        heading.id
                                    )
                                }
                                className={`text-sm font-medium ${
                                    activeHeading ===
                                    heading.id
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-700 dark:text-gray-300"
                                } hover:underline`}
                            >
                                {heading.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
