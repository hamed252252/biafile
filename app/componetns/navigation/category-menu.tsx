"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Menu as MenuIcon,
    X as CloseIcon,
    ChevronDown,
    Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/moving-border";

interface CategoryEntity {
    id: number;
    title: string;
    uniqCode: string;
    subResultCategorys: CategoryEntity[];
}

export default function CategoryMenu() {
    const [categories, setCategories] = useState<
        CategoryEntity[]
    >([]);
    const [openIndex, setOpenIndex] = useState<
        number | null
    >(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    // گرفتن دسته‌بندی‌ها از API
    useEffect(() => {
        fetch("https://api.biafile.ir/Api/Categorys/Public")
            .then((r) => r.json())
            .then((data) => setCategories(data.entities))
            .catch(console.error);
    }, []);

    return (
        <nav className="relative z-50 dark:bg-gray-900">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* منوی دسکتاپ */}
                <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
                    {categories.map((cat, idx) => (
                        <div
                            key={cat.id}
                            className="relative"
                            onMouseEnter={() =>
                                setOpenIndex(idx)
                            }
                            onMouseLeave={() =>
                                setOpenIndex(null)
                            }
                        >
                            <button className="flex items-center space-x-1 rtl:space-x-reverse text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                                <span>{cat.title}</span>
                                {cat.subResultCategorys
                                    .length > 0 && (
                                    <motion.span
                                        animate={{
                                            rotate:
                                                openIndex ===
                                                idx
                                                    ? 180
                                                    : 0,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                    </motion.span>
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === idx &&
                                    cat.subResultCategorys
                                        .length > 0 && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 10,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                            className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden"
                                        >
                                            {cat.subResultCategorys.map(
                                                (sub) => (
                                                    <Link
                                                        key={
                                                            sub.id
                                                        }
                                                        href={`/${cat.uniqCode}/${sub.uniqCode}`}
                                                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                                    >
                                                        {
                                                            sub.title
                                                        }
                                                    </Link>
                                                )
                                            )}
                                        </motion.div>
                                    )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {/* لینک‌های بیشتر */}
                    <div
                        className="relative"
                        onMouseEnter={() =>
                            setOpenIndex(categories.length)
                        }
                        onMouseLeave={() =>
                            setOpenIndex(null)
                        }
                    >
                        <button className="flex items-center space-x-1 rtl:space-x-reverse text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                            <span>بیشتر</span>
                            <motion.span
                                animate={{
                                    rotate:
                                        openIndex ===
                                        categories.length
                                            ? 180
                                            : 0,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                            >
                                <ChevronDown className="w-4 h-4" />
                            </motion.span>
                        </button>
                        <AnimatePresence>
                            {openIndex ===
                                categories.length && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden"
                                >
                                    {[
                                        {
                                            href: "/aboutus",
                                            label: "درباره ما",
                                        },
                                        {
                                            href: "/contactus",
                                            label: "تماس با ما",
                                        },
                                        {
                                            href: "/blog",
                                            label: "مجله",
                                        },
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* دکمه منوی موبایل */}
                <button
                    className="md:hidden text-gray-700 dark:text-gray-200"
                    onClick={() => setMobileOpen(true)}
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Drawer موبایل */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() =>
                                setMobileOpen(false)
                            }
                        />

                        {/* Panel */}
                        <motion.div
                            className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white dark:bg-gray-900 z-50 shadow-lg p-4 flex flex-col"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "tween",
                                duration: 0.3,
                            }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    دسته‌بندی‌ها
                                </h2>
                                <button
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                >
                                    <CloseIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                </button>
                            </div>

                            {/* جستجو */}
                            <div className="relative mb-4">
                                <Input
                                    type="search"
                                    placeholder="جستجو..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                            </div>

                            {/* لیست دسته‌ها */}
                            <div className="overflow-auto flex-1 space-y-2">
                                {categories.map((cat) => (
                                    <details
                                        key={cat.id}
                                        className="mb-2"
                                    >
                                        <summary className="cursor-pointer py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                            {cat.title}
                                        </summary>
                                        <div className="pl-4 mt-1 space-y-1">
                                            {cat.subResultCategorys.map(
                                                (sub) => (
                                                    <Link
                                                        key={
                                                            sub.id
                                                        }
                                                        href={`/${cat.uniqCode}/${sub.uniqCode}`}
                                                        className="block py-1 px-2 hover:text-blue-600 transition"
                                                    >
                                                        {
                                                            sub.title
                                                        }
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </details>
                                ))}

                                {/* آیتم‌های ثابت بیشتر */}
                                <div className="mt-4 space-y-2">
                                    <Link
                                        href="/aboutus"
                                        className="block py-2 px-2 hover:text-blue-600 transition"
                                    >
                                        درباره ما
                                    </Link>
                                    <Link
                                        href="/contactus"
                                        className="block py-2 px-2 hover:text-blue-600 transition"
                                    >
                                        تماس با ما
                                    </Link>
                                    <Link
                                        href="/blog"
                                        className="block py-2 px-2 hover:text-blue-600 transition"
                                    >
                                        مجله
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
