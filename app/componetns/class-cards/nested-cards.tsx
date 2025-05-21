import { Suspense } from "react";
import Link from "next/link";
import { SkeletonCard } from "../ui/skeleton-card";
import { fetchCategories } from "@/app/lib/api";
import { Stat } from "@/app/type/api-types";
import ClassCard from "./classCard";

// Placeholder for loading state
function LoadingCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-4 border shadow-lg m-4 p-5">
            {Array(4)
                .fill(0)
                .map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
        </div>
    );
}

async function CategoryContent() {
    const data = await fetchCategories();

    // Mock stats - replace with real data when available
    const mockStats: Stat[] = [
        {
            label: "نمونه سؤال",
            value: 20,
            iconName: "sampleQuestion",
        },
        {
            label: "فایل آموزشی",
            value: 15,
            iconName: "educationalFile",
        },
    ];

    if (!data.entities || data.entities.length === 0) {
        return (
            <div className="text-center p-10 rtl">
                <h2 className="text-2xl font-bold mb-4">
                    هیچ دسته‌بندی یافت نشد
                </h2>
                <p>
                    لطفاً بعداً دوباره امتحان کنید یا با
                    پشتیبانی تماس بگیرید.
                </p>
            </div>
        );
    }

    return (
        <>
            {data.entities.map((entity) => (
                <div
                    key={entity.id}
                    className="py-2 my-6 rtl"
                >
                    <h2 className="font-bold mr-4 text-xl mb-2 flex items-center">
                        <Link
                            href={entity.uniqCode}
                            className="hover:text-primary transition-colors"
                        >
                            {entity.title}
                        </Link>
                        <span className="mr-2 text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {
                                entity.subResultCategorys
                                    .length
                            }{" "}
                            دسته
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-4 border shadow-lg m-4 p-5 rounded-lg">
                        {entity.subResultCategorys.map(
                            (sub) => (
                                <ClassCard
                                    key={sub.id}
                                    className={sub.title}
                                    stats={mockStats}
                                    lessons={sub.subResultCategorys.map(
                                        (lesson) => ({
                                            name: lesson.title,
                                            url: `${entity.uniqCode}/${sub.uniqCode}/${lesson.uniqCode}`,
                                        })
                                    )}
                                    linkForSeeMore={`${entity.uniqCode}/${sub.uniqCode}`}
                                    lastUpdate="۱۴۰۲/۰۲/۱۵"
                                />
                            )
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}

export default function NestedCardClasses() {
    return (
        <section className="p-3 m-4 rtl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    دسته‌بندی‌های آموزشی
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    تمام دسته‌بندی‌های آموزشی ما را در اینجا
                    مشاهده کنید
                </p>
            </div>

            <Suspense fallback={<LoadingCards />}>
                <CategoryContent />
            </Suspense>
        </section>
    );
}
