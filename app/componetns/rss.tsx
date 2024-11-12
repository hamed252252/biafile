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

function RssComponet() {
    return (
        <div>
            <motion.div
                {...animationProps}
                transition={{
                    ...animationProps.transition,
                    delay: 0.8,
                }}
                className="bg-blue-100 p-8 rounded-lg shadow-inner mb-12"
            >
                <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">
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
                                className="pl-10 pr-4"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
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

export default RssComponet;
