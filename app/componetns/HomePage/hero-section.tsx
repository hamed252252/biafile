"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface HeroEntity {
    id: number;
    title: string;
    description: string;
    jsonPictures: string | null;
}

interface Picture {
    Title: string;
    PathFileName: string;
}

const IMAGE_BASE_URL =
    "https://api.biafile.ir/Uploadfiles/Files";

export default function HeroSection() {
    const [hero, setHero] = useState<HeroEntity | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Index state only used if needed for fallback
    const [currentIndex, setCurrentIndex] = useState(0);

    // Safely parse escaped JSON
    const pictures: Picture[] = useMemo(() => {
        if (!hero?.jsonPictures) return [];
        try {
            const parsed = JSON.parse(hero.jsonPictures);
            return typeof parsed === "string"
                ? (JSON.parse(parsed) as Picture[])
                : (parsed as Picture[]);
        } catch {
            return [];
        }
    }, [hero]);

    useEffect(() => {
        fetch(
            "https://api.biafile.ir/Api/Herosections/AllForPublicPage"
        )
            .then((res) => {
                if (!res.ok)
                    throw new Error(
                        "خطا در دریافت اطلاعات"
                    );
                return res.json();
            })
            .then((data) => {
                const item = Array.isArray(data.entities)
                    ? data.entities[0]
                    : null;
                if (item) setHero(item as HeroEntity);
                else setError("هیچ داده‌ای یافت نشد");
            })
            .catch(() =>
                setError("اتصال به سرور امکان‌پذیر نیست")
            )
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return (
            <div className="py-12 text-center">
                در حال بارگذاری...
            </div>
        );
    if (error || !hero)
        return (
            <div className="py-12 text-center text-red-500">
                {error || "خطایی رخ داده"}
            </div>
        );

    return (
        <section className="relative w-full overflow-hidden bg-white dark:bg-gray-900">
            {/* Curved Background */}
            <div className="absolute inset-0 z-0">
                <svg
                    viewBox="0 0 1440 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 0H1440V600C1440 600 1082.5 800 720 800C357.5 800 0 600 0 600V0Z"
                        fill="#F3F0FF"
                        className="dark:fill-muted"
                    />
                </svg>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 py-16 md:py-24">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                    {/* Text Content */}
                    <div className="md:w-1/2 text-right space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-slate-100">
                            {hero.title}
                        </h1>
                        <div
                            className="text-lg md:text-xl text-gray-600 dark:text-slate-100 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: hero.description,
                            }}
                        />
                    </div>

                    {/* Carousel or Single Image */}
                    <div className="md:w-1/2">
                        {pictures.length > 1 ? (
                            <Carousel
                                dir="ltr"
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="relative rounded-2xl overflow-hidden shadow-xl"
                            >
                                <CarouselContent className="space-x-0">
                                    {pictures.map((pic) => (
                                        <CarouselItem
                                            key={
                                                pic.PathFileName
                                            }
                                            className="relative w-full aspect-[3/2]"
                                        >
                                            <Image
                                                src={`${IMAGE_BASE_URL}/${pic.PathFileName}`}
                                                alt={
                                                    pic.Title
                                                }
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover"
                                                priority
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        ) : (
                            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src={
                                        pictures[0]
                                            ? `${IMAGE_BASE_URL}/${pictures[0].PathFileName}`
                                            : "/placeholder.svg"
                                    }
                                    alt={hero.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
