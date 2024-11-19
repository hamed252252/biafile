"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/moving-border";
import { motion } from "framer-motion";

const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
};

function RssComponent() {
    return (
        <div className="dark:bg-gray-900">
            <motion.div
                {...animationProps}
                transition={{
                    ...animationProps.transition,
                    delay: 0.8,
                }}
                className="bg-blue-100 dark:bg-gray-800 p-8 rounded-lg shadow-inner mb-12"
            >
                <h2 className="text-2xl font-bold text-center mb-4 text-blue-800 dark:text-blue-300">
                    عضویت در خبرنامه
                </h2>
                <form className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <div className="flex-grow max-w-md">
                        <Label
                            htmlFor="email"
                            className="sr-only"
                        >
                            آدرس ایمیل
                        </Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="آدرس ایمیل خود را وارد کنید"
                                className="border w-96 border-slate-400 dark:border-slate-600 dark:bg-gray-700 dark:text-white"
                            />
                            <Mail className="absolute left-2 md:left-20 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                        </div>
                    </div>

                    <Button className="bg-primary border-none h-10 w-full dark:bg-blue-600 dark:hover:bg-blue-700">
                        عضویت
                    </Button>
                </form>
            </motion.div>

            <motion.div
                {...animationProps}
                transition={{
                    ...animationProps.transition,
                    delay: 1,
                }}
                className="text-center"
            />
        </div>
    );
}

export default RssComponent;
