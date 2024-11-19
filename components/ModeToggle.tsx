"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="relative w-10 h-10 rounded-full dark:bg-white"
                >
                    <AnimatePresence
                        mode="wait"
                        initial={false}
                    >
                        <motion.div
                            key={theme}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {theme === "light" && (
                                <Sun
                                    className={cn(
                                        "h-4 w-4",
                                        theme ? "dark" : "",
                                        "stroke-black"
                                    )}
                                />
                            )}
                            {theme === "dark" && (
                                <Moon
                                    className={cn(
                                        "h-4 w-4",
                                        theme
                                            ? "dark"
                                            : "stroke-white bg-white",
                                        "stroke-black"
                                    )}
                                />
                            )}
                            {theme === "system" && (
                                <Laptop
                                    className={cn(
                                        "h-4 w-4",
                                        theme
                                            ? "dark"
                                            : "stroke-white",
                                        "stroke-black"
                                    )}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="bg-white dark:bg-background"
                align="end"
            >
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                >
                    <Sun
                        className={cn(
                            "mr-2 h-4 w-4 ",
                            theme === "dark" &&
                                "stroke-white",
                            theme === "light" &&
                                "stroke-black"
                        )}
                    />
                    <span>روشن</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                >
                    <Moon
                        className={cn(
                            "mr-2 h-4 w-4 ",
                            theme === "dark" &&
                                "stroke-white",
                            theme === "light" &&
                                "stroke-black"
                        )}
                    />
                    <span>تاریک</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                >
                    <Laptop
                        className={cn(
                            "mr-2 h-4 w-4 ",
                            theme === "dark" &&
                                "stroke-white",
                            theme === "light" &&
                                "stroke-black"
                        )}
                    />
                    <span>سیستم</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
