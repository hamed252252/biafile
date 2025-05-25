"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
    motion,
    AnimatePresence,
    LayoutGroup,
} from "framer-motion";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonialsData = [
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

export default function AboutUsPage() {
    const [mounted, setMounted] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] =
        useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;

    const nextTestimonial = () =>
        setCurrentTestimonial(
            (p) => (p + 1) % testimonialsData.length
        );
    const prevTestimonial = () =>
        setCurrentTestimonial(
            (p) =>
                (p - 1 + testimonialsData.length) %
                testimonialsData.length
        );

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div
            dir="rtl"
            className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        >
            {/* Hero Section */}
            <motion.header
                className="relative h-96 overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0 mix-blend-overlay bg-black/30" />
                <motion.h1
                    className="relative text-5xl sm:text-6xl font-bold text-white drop-shadow-lg"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.8,
                    }}
                >
                    درباره ما
                </motion.h1>
            </motion.header>

            <main className="container mx-auto px-6 py-12 space-y-24">
                {/* Intro Section */}
                <motion.section
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8 }}
                >
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img
                            src="https://source.unsplash.com/600x400/?online-learning,education"
                            alt="معرفی بیا فایل"
                            className="object-cover w-full h-72 lg:h-full"
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-semibold">
                            معرفی بیا فایل
                        </h2>
                        <p className="leading-relaxed">
                            <strong>
                                تاریخ شروع فعالیت:
                            </strong>{" "}
                            آبان ماه ۱۴۰۳
                        </p>
                        <p className="leading-relaxed">
                            سایت بیا فایل، مجموعه‌ای از
                            دانش‌آموختگان دانشگاه فرهنگیان
                            (معلمان رسمی) وزارت آموزش و
                            پرورش جمهوری اسلامی ایران
                            می‌باشد. در راستای سوگند جایگاه
                            مقدس معلمی بر خود لازم دانستیم
                            برای همیاری به همکاران و
                            دانش‌آموزان خدمات متنوعی ارائه
                            دهیم.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>
                                ارائه فایل‌های متنوع برای
                                تسهیل جریان یاددهی-یادگیری
                            </li>
                            <li>
                                ایجاد منبع غنی از ابزارهای
                                ارزشیابی مختلف
                            </li>
                            <li>
                                کاوش در دنیای نوین آموزش
                                جهانی
                            </li>
                        </ul>
                    </div>
                </motion.section>

                {/* Team Section */}
                <motion.section
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                    }}
                >
                    <h2 className="text-3xl font-semibold text-center mb-8">
                        تیم ما
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                whileHover={{
                                    translateY: -5,
                                    boxShadow:
                                        "0 10px 15px rgba(0,0,0,0.2)",
                                }}
                                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-shadow"
                            >
                                <img
                                    src={`https://source.unsplash.com/400x300/?teacher,portrait?sig=${i}`}
                                    alt={`عضو تیم ${i}`}
                                    className="object-cover w-full h-48"
                                />
                                <div className="p-4 text-center">
                                    <h3 className="text-xl font-medium mb-1">
                                        نام عضو تیم {i}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        سمت شغلی
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Testimonials Section */}
                <motion.section
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                    }}
                >
                    <h2 className="text-3xl font-semibold text-center mb-8">
                        نظرات دانش‌آموزان
                    </h2>
                    <LayoutGroup>
                        <div className="relative mx-auto max-w-xl bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevTestimonial}
                                className="absolute top-1/2 left-4 -translate-y-1/2 text-2xl text-blue-600"
                            >
                                <ChevronLeft />
                            </motion.button>
                            <AnimatePresence
                                initial={false}
                                custom={currentTestimonial}
                            >
                                <motion.div
                                    key={currentTestimonial}
                                    custom={
                                        currentTestimonial
                                    }
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
                                    className="text-center px-8"
                                >
                                    <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                                        “
                                        {
                                            testimonialsData[
                                                currentTestimonial
                                            ].text
                                        }
                                        ”
                                    </p>
                                    <p className="font-medium text-blue-600 dark:text-blue-400">
                                        —{" "}
                                        {
                                            testimonialsData[
                                                currentTestimonial
                                            ].name
                                        }
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextTestimonial}
                                className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-blue-600"
                            >
                                <ChevronRight />
                            </motion.button>
                        </div>
                    </LayoutGroup>
                </motion.section>

                {/* FAQ Section */}
                <motion.section
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.8,
                        delay: 0.6,
                    }}
                >
                    <h2 className="text-3xl font-semibold text-center mb-8">
                        سوالات متداول
                    </h2>
                    <div className="max-w-xl mx-auto space-y-4">
                        <Accordion
                            type="single"
                            collapsible
                        >
                            <AccordionItem value="faq-1">
                                <AccordionTrigger>
                                    اهداف سایت چیست؟
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc space-y-1">
                                        <li>
                                            ارائه فایل‌های
                                            متنوع برای تسهیل
                                            یاددهی-یادگیری
                                        </li>
                                        <li>
                                            ایجاد منبع غنی
                                            ابزارهای
                                            ارزشیابی
                                        </li>
                                        <li>
                                            کاوش در دنیای
                                            نوین آموزش جهانی
                                        </li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="faq-2">
                                <AccordionTrigger>
                                    نحوه ثبت‌نام چگونه است؟
                                </AccordionTrigger>
                                <AccordionContent>
                                    برای ثبت‌نام ارائه یک
                                    ایمیل معتبر یا شماره
                                    تماس، دریافت کد پیامکی و
                                    احراز هویت کافی است.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="faq-3">
                                <AccordionTrigger>
                                    چگونه فایل‌ها را دانلود
                                    کنم؟
                                </AccordionTrigger>
                                <AccordionContent>
                                    پس از ورود به حساب
                                    کاربری، در بخش فایل‌ها
                                    دکمه دانلود کنار هر فایل
                                    را کلیک کنید.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </motion.section>

                {/* Rules & Policies Section */}
                <motion.section
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.8,
                        delay: 0.8,
                    }}
                    className="space-y-12"
                >
                    <h2 className="text-3xl font-semibold text-center mb-8">
                        قوانین و سیاست‌ها
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-medium mb-4">
                                قوانین ثبت‌نام
                            </h3>
                            <ul className="list-decimal list-inside space-y-2 text-lg">
                                <li>
                                    ارائه ایمیل معتبر یا
                                    شماره تماس برای ثبت‌نام
                                    کافی است.
                                </li>
                                <li>
                                    احراز هویت از طریق ارسال
                                    پیامک کد تأیید انجام
                                    می‌شود.
                                </li>
                                <li>
                                    با ثبت‌نام، کاربر اعلام
                                    می‌کند سن قانونی را دارد
                                    یا زیرنظر قیم قانونی
                                    است.
                                </li>
                                <li>
                                    تکمیل اطلاعات فردی در
                                    پنل کاملاً اختیاری است.
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-medium mb-4">
                                قوانین سایت
                            </h3>
                            <ul className="list-decimal list-inside space-y-2 text-lg">
                                <li>
                                    اشتراک‌گذاری با ذکر منبع
                                    مجاز است.
                                </li>
                                <li>
                                    مبالغ شارژ اصلی غیرقابل
                                    عودت است.
                                </li>
                                <li>
                                    اعتبار هدیه محدودیت
                                    زمانی دارد و پس از مهلت
                                    صفر می‌شود.
                                </li>
                                <li>
                                    حقوق مادی و معنوی متعلق
                                    به مالک سایت است.
                                </li>
                                <li>
                                    سایت تابع قوانین جمهوری
                                    اسلامی ایران است.
                                </li>
                                <li>
                                    بحث سیاسی، مذهبی و توهین
                                    ممنوع است.
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-medium mb-4">
                                قوانین خرید
                            </h3>
                            <ul className="list-decimal list-inside space-y-2 text-lg">
                                <li>
                                    مبالغ پیش‌فرض برای شارژ
                                    اعتبار در نظر گرفته شده
                                    است.
                                </li>
                                <li>
                                    با هر شارژ اعتبار،
                                    اعتبار هدیه نیز تعلق
                                    می‌گیرد.
                                </li>
                                <li>
                                    ابتدا اعتبار هدیه مصرف
                                    می‌شود.
                                </li>
                                <li>
                                    مبالغ شارژ اصلی
                                    بازگشت‌ناپذیر است.
                                </li>
                                <li>
                                    دانلودها در تاریخچه ثبت
                                    می‌شوند.
                                </li>
                                <li>
                                    سایت مسوول تطابق فایل با
                                    نیاز شما نیست.
                                </li>
                                <li>
                                    لینک خراب را به پشتیبانی
                                    گزارش دهید.
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-medium mb-4">
                                سیاست‌های حریم خصوصی
                            </h3>
                            <ul className="list-decimal list-inside space-y-2 text-lg">
                                <li>
                                    استفاده از ایمیل یا
                                    شماره تماس فقط برای
                                    تبلیغات و ارائه خدمات
                                    است.
                                </li>
                                <li>
                                    اطلاعات شخصی قابل معامله
                                    نیست مگر در مواقع فورس
                                    ماژور.
                                </li>
                                <li>
                                    سعی ما بر حفظ حداکثری
                                    امنیت اطلاعات شما است.
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.section>
            </main>
        </div>
    );
}
