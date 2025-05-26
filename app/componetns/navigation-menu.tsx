"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    Search,
    User,
    Sun,
    Moon,
} from "lucide-react";
import logoImage from "@/public/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryMenu from "./navigation/category-menu";

export default function NavigationMenu() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center space-x-2"
                >
                    <Link
                        href="/"
                        className="flex items-center"
                    >
                        <Image
                            src={logoImage}
                            alt="بیافایل"
                            width={40}
                            height={40}
                        />
                        <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white">
                            بیافایل
                        </span>
                    </Link>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                  
                        <CategoryMenu />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        <Input
                            type="search"
                            placeholder="جستجو..."
                            className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        <Link href={"/dashboard"}>
                        <User className="text-gray-600 dark:text-gray-300" />
                        </Link>
                    </motion.button>

                    <motion.button
                        onClick={toggleDarkMode}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        {darkMode ? (
                            <Sun className="text-yellow-400" />
                        ) : (
                            <Moon className="text-gray-600" />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden ">

                <CategoryMenu />
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() =>
                                setMobileOpen(false)
                            }
                        />

                        <motion.div
                            className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "tween",
                                duration: 0.3,
                            }}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    منو
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                >
                                    <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                </Button>
                            </div>

                            <div className="overflow-auto p-4 space-y-4">
                                <CategoryMenu />
                                <div className="relative">
                                    <Input
                                        type="search"
                                        placeholder="جستجو..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                                </div>
                                <Button
                                    className="w-full"
                                    variant="outline"
                                >
                                    ورود / ثبت‌نام
                                </Button>
                                <Button
                                    className="w-full"
                                    variant="ghost"
                                    onClick={toggleDarkMode}
                                >
                                    {darkMode
                                        ? "حالت روز"
                                        : "حالت شب"}
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
