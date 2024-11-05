"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export default function ContactDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) =>
            setTimeout(resolve, 2000)
        );
        setIsSubmitting(false);
        setIsSubmitted(true);
        // Close dialog after a delay
        setTimeout(() => {
            setIsOpen(false);
            // Reset form state after dialog is closed
            setTimeout(() => setIsSubmitted(false), 300);
        }, 2000);
    };

    const formFields = [
        {
            id: "name",
            label: "نام",
            type: "text",
            placeholder: "نام خود را وارد کنید",
        },
        {
            id: "email",
            label: "ایمیل",
            type: "email",
            placeholder: "ایمیل خود را وارد کنید",
        },
        {
            id: "message",
            label: "پیام",
            type: "textarea",
            placeholder: "پیام خود را بنویسید",
        },
    ];

    return (
        <div
            className="flex justify-center items-center my-2"
            dir="rtl"
        >
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTrigger asChild>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        تماس با ما
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center text-blue-700">
                            تماس با ما
                        </DialogTitle>
                        <DialogDescription className="text-center text-blue-500">
                            لطفاً فرم زیر را پر کنید
                        </DialogDescription>
                    </DialogHeader>
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                }}
                            >
                                <div className="space-y-4 mt-4">
                                    {formFields.map(
                                        (field, index) => (
                                            <motion.div
                                                key={
                                                    field.id
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    y: 20,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay:
                                                        index *
                                                        0.1,
                                                }}
                                            >
                                                <label
                                                    htmlFor={
                                                        field.id
                                                    }
                                                    className="block text-sm font-medium mb-1 text-blue-700"
                                                >
                                                    {
                                                        field.label
                                                    }
                                                </label>
                                                {field.type ===
                                                "textarea" ? (
                                                    <Textarea
                                                        id={
                                                            field.id
                                                        }
                                                        placeholder={
                                                            field.placeholder
                                                        }
                                                        rows={
                                                            4
                                                        }
                                                        required
                                                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                ) : (
                                                    <Input
                                                        id={
                                                            field.id
                                                        }
                                                        type={
                                                            field.type
                                                        }
                                                        placeholder={
                                                            field.placeholder
                                                        }
                                                        required
                                                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                )}
                                            </motion.div>
                                        )
                                    )}
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                                            disabled={
                                                isSubmitting
                                            }
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    در حال
                                                    ارسال...
                                                </>
                                            ) : (
                                                "ارسال پیام"
                                            )}
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -20,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-md text-center"
                            >
                                پیام شما با موفقیت ارسال شد.
                                با تشکر!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </div>
    );
}
