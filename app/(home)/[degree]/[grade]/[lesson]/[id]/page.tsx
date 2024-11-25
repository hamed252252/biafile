"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
    Star,
    Download,
    Share2,
    BookOpen,
    Users,
    Clock,
    ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function WorksheetDetail() {
    const [previewImage] = useState(
        "/placeholder.svg?height=600&width=400"
    );
    const router = useRouter();
    return (
        <div
            className="min-h-screen  bg-background "
            dir="rtl"
        >
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className="hover:text-primary/75 hover:cursor-pointer"
                                href="/"
                            >
                                صفحه اصلی
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbItem
                                className="hover:text-primary/75 hover:cursor-pointer"
                                onClick={() =>
                                    window.history.go(-2)
                                }
                            >
                                کاربرگ‌ها
                            </BreadcrumbItem>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbItem
                                className="hover:text-primary/75 hover:cursor-pointer"
                                onClick={() =>
                                    router.back()
                                }
                            >
                                فارسی
                            </BreadcrumbItem>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Preview Section */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-[3/4] w-full">
                                    <Image
                                        src={previewImage}
                                        alt="پیش‌نمایش کاربرگ"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <p className="text-sm text-muted-foreground text-center">
                            پیش‌نمایش صفحه اول فایل • تعداد
                            صفحات: ۴
                        </p>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-bold">
                                    کاربرگ جامع نشانه س
                                </h1>
                                <div className="flex gap-1">
                                    {[...Array(5)].map(
                                        (_, i) => (
                                            <Star
                                                key={i}
                                                className="w-5 h-5 fill-primary text-primary"
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary">
                                    دبستان
                                </Badge>
                                <Badge variant="secondary">
                                    اول
                                </Badge>
                                <Badge variant="secondary">
                                    فارسی
                                </Badge>
                                <Badge variant="secondary">
                                    ۱۴۰۳
                                </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    ۲۴۸ بازدید
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    ۲۸ آذر ۱۴۰۳
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">
                                اهداف آموزشی:
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>
                                    آموزش و تشخیص نشانه های
                                    کلمات، تمرکز بر تشخیص و
                                    اضافه کردن نشانه س به
                                    کلمات
                                </li>
                                <li>بازی با ترکیب ها</li>
                                <li>
                                    آموزش رنگ کردن نشانه ها
                                </li>
                                <li>
                                    تقویت حافظه و تشخیص
                                    کلمات، تکمیل جداول مشابه
                                    و سودوکو برای تقویت
                                    حافظه و یادگیری
                                </li>
                                <li>بازی برای روانخوانی</li>
                            </ul>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    className="flex-1"
                                    size="lg"
                                >
                                    <Download className="ml-2 h-4 w-4" />
                                    دانلود فایل PDF (۴,۰۰۰
                                    تومان)
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    size="lg"
                                >
                                    <Download className="ml-2 h-4 w-4" />
                                    دانلود فایل WORD (۸,۰۰۰
                                    تومان)
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
                                طراح: عباس رمضان زاده •
                                تالیف و پست آذینه
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
