"use client";

import BlueEyes from "@/public/BlueEyesTecherFm.webp";
import BrownEyes from "@/public/brownEyesTeacherFm.webp";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
    ChevronLeft,
    ChevronRight,
    Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutUs() {
    const [currentTestimonial, setCurrentTestimonial] =
        useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const testimonials = [
        {
            name: "سارا احمدی",
            text: "این موسسه زندگی تحصیلی من را متحول کرد. معلمان فوق‌العاده و منابع عالی!",
        },
        {
            name: "علی محمدی",
            text: "من توانستم به دانشگاه مورد علاقه‌ام راه پیدا کنم. از همه معلمان و کارکنان سپاسگزارم.",
        },
        {
            name: "مریم رضایی",
            text: "کلاس‌های آنلاین بسیار انعطاف‌پذیر و مفید هستند. من توانستم در کنار کار، تحصیلاتم را ادامه دهم.",
        },
    ];

    const nextTestimonial = () => {
        setCurrentTestimonial(
            (prev) => (prev + 1) % testimonials.length
        );
    };

    const prevTestimonial = () => {
        setCurrentTestimonial(
            (prev) =>
                (prev - 1 + testimonials.length) %
                testimonials.length
        );
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-gradient-to-b from-blue-100 to-white rtl"
        >
            <motion.div
                className="relative h-[95vh] bg-blue-800 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Image
                    src={BrownEyes.src}
                    fill
                    alt="Hero background"
                    layout=""
                    className="opacity-60 object-fill  aspect-auto "
                />
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.8,
                    }}
                >
                    <h1 className="text-5xl font-bold text-primary-foreground text-center mb-8">
                        به موسسه آموزشی ما خوش آمدید
                    </h1>
                </motion.div>
            </motion.div>

            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Tabs
                        dir="rtl"
                        defaultValue="mission"
                        className="mb-12"
                    >
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="mission">
                                ماموریت ما
                            </TabsTrigger>
                            <TabsTrigger value="history">
                                تاریخچه
                            </TabsTrigger>
                            <TabsTrigger value="values">
                                ارزش‌ها
                            </TabsTrigger>
                        </TabsList>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={
                                    isVisible
                                        ? "visible"
                                        : "hidden"
                                }
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
                                    duration: 0.5,
                                }}
                            >
                                <TabsContent value="mission">
                                    <Card>
                                        <CardContent className="p-6">
                                            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                                                ماموریت ما
                                            </h2>
                                            <p className="text-lg text-gray-700">
                                                ما متعهد به
                                                ارائه آموزش
                                                با کیفیت
                                                بالا به تمام
                                                دانش‌آموزان
                                                ایرانی
                                                هستیم. هدف
                                                ما
                                                توانمندسازی
                                                نسل آینده از
                                                طریق یادگیری
                                                نوآورانه و
                                                فراگیر است.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="history">
                                    <Card>
                                        <CardContent className="p-6">
                                            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                                                تاریخچه ما
                                            </h2>
                                            <p className="text-gray-700">
                                                موسسه آموزشی
                                                ما در سال
                                                ۱۳۸۵ تاسیس
                                                شد. از آن
                                                زمان، ما به
                                                بیش از
                                                ۱۰۰،۰۰۰
                                                دانش‌آموز در
                                                سراسر ایران
                                                خدمت
                                                کرده‌ایم.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="values">
                                    <Card>
                                        <CardContent className="p-6">
                                            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                                                ارزش‌های ما
                                            </h2>
                                            <ul className="list-disc list-inside text-gray-700">
                                                <li>
                                                    نوآوری
                                                    در آموزش
                                                </li>
                                                <li>
                                                    برابری و
                                                    دسترسی
                                                </li>
                                                <li>
                                                    تعالی
                                                    علمی
                                                </li>
                                                <li>
                                                    یادگیری
                                                    مادام‌العمر
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </motion.div>
                        </AnimatePresence>
                    </Tabs>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                    }}
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
                        تیم ما
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Card className="group hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-6 flex flex-col items-center">
                                        <div className="relative overflow-hidden rounded-full mb-4">
                                            <Image
                                                src={
                                                    BlueEyes
                                                }
                                                alt={`Team Member ${i}`}
                                                width={150}
                                                height={150}
                                                className="transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-blue-700">
                                            نام عضو تیم {i}
                                        </h3>
                                        <p className="text-gray-600 text-center">
                                            سمت شغلی
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                    }}
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
                        نظرات دانش‌آموزان
                    </h2>
                    <div className="relative bg-white p-8 rounded-lg shadow-lg mb-12">
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-6 w-6 text-blue-600" />
                        </button>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial}
                                initial={{
                                    opacity: 0,
                                    x: 50,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -50,
                                }}
                                transition={{
                                    duration: 0.5,
                                }}
                                className="text-center"
                            >
                                <p className="text-lg text-gray-700 mb-4">
                                    {
                                        testimonials[
                                            currentTestimonial
                                        ].text
                                    }
                                </p>
                                <p className="font-semibold text-blue-600">
                                    {
                                        testimonials[
                                            currentTestimonial
                                        ].name
                                    }
                                </p>
                            </motion.div>
                        </AnimatePresence>
                        <button
                            onClick={nextTestimonial}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-6 w-6 text-blue-600" />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.6,
                    }}
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
                        سوالات متداول
                    </h2>
                    <Accordion
                        type="single"
                        collapsible
                        className="mb-12"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                چگونه می‌توانم در دوره‌های
                                شما ثبت‌نام کنم؟
                            </AccordionTrigger>
                            <AccordionContent>
                                برای ثبت‌نام، به صفحه
                                دوره‌های ما مراجعه کنید و
                                دوره مورد نظر خود را انتخاب
                                کنید. سپس روی دکمه "ثبت‌نام"
                                کلیک کرده و مراحل را دنبال
                                کنید.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                آیا دوره‌های آنلاین ارائه
                                می‌دهید؟
                            </AccordionTrigger>
                            <AccordionContent>
                                بله، ما طیف وسیعی از
                                دوره‌های آنلاین را ارائه
                                می‌دهیم که می‌توانید از هر
                                جایی به آنها دسترسی داشته
                                باشید.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                شهریه دوره‌ها چگونه محاسبه
                                می‌شود؟
                            </AccordionTrigger>
                            <AccordionContent>
                                شهریه بر اساس نوع دوره، مدت
                                زمان و سطح آن متفاوت است.
                                برای اطلاعات دقیق، لطفاً به
                                صفحه هر دوره مراجعه کنید یا
                                با ما تماس بگیرید.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center"
                ></motion.div>
            </div>
        </div>
    );
}
