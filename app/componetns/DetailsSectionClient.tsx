"use client";

import { useState } from "react";
import {
    Star,
    Download,
    Share2,
    BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DetailsSectionClient() {
    const [rating] = useState(5); // Assuming a fixed rating for demonstration

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">
                        کاربرگ جامع نشانه س
                    </h1>
                    <div className="flex gap-1">
                        {[...Array(rating)].map((_, i) => (
                            <Star
                                key={i}
                                className="w-5 h-5 fill-primary text-primary"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {/* Add your Badge components here */}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    {/* Add your view count and date here */}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">
                    اهداف آموزشی:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                        آموزش و تشخیص نشانه های کلمات، تمرکز
                        بر تشخیص و اضافه کردن نشانه س به
                        کلمات
                    </li>
                    <li>بازی با ترکیب ها</li>
                    <li>آموزش رنگ کردن نشانه ها</li>
                    <li>
                        تقویت حافظه و تشخیص کلمات، تکمیل
                        جداول مشابه و سودوکو برای تقویت
                        حافظه و یادگیری
                    </li>
                    <li>بازی برای روانخوانی</li>
                </ul>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        className="flex-1"
                        size="lg"
                    >
                        <Download className="ml-2 h-4 w-4" />
                        دانلود فایل PDF (۴,۰۰۰ تومان)
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1"
                        size="lg"
                    >
                        <Download className="ml-2 h-4 w-4" />
                        دانلود فایل WORD (۸,۰۰۰ تومان)
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                >
                    <Share2 className="ml-2 h-4 w-4" />
                    اشتراک‌گذاری
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                >
                    <BookOpen className="ml-2 h-4 w-4" />
                    گزارش مشکل
                </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                    طراح: عباس رمضان زاده • تالیف و پست
                    آذینه
                </p>
            </div>
        </div>
    );
}
