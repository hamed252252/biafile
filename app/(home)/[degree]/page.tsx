// app/(home)/[degree]/page.tsx

import ClassCard from "@/app/componetns/class-cards/classCard";
import { LessonLink, Stat } from "@/app/type/api-types";
import { notFound } from "next/navigation";

export const dynamicParams = true;

type PageProps = {
    params: Promise<{ degree: string }>;
};

interface CategoryEntity {
    id: number;
    title: string;
    description: string | null;
    uniqCode: string;
    subResultCategorys: CategoryEntity[];
}

interface LocalClassData {
    entities: CategoryEntity[];
}

export default async function DegreePage({
    params,
}: PageProps) {
    // 1) پارامتر URL را await می‌کنیم
    const { degree } = await params;

    // 2) فراخوانی API و استخراج فیلد entities
    const raw = await fetch(
        "https://api.biafile.ir/Api/Categorys/Public"
    ).then((r) => r.json());
    const classData: LocalClassData = {
        entities: raw.entities,
    };

    // 3) پیدا کردن دادهٔ مربوط به degree
    const degreeData = classData.entities.find(
        (c) => c.uniqCode === degree
    );
    if (!degreeData) return notFound();

    // 4) آمار نمونه برای هر کارت
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

    // 5) رندر زیرشاخه‌ها با کارت
    return (
        <div
            className="mx-auto py-10"
            dir="rtl"
        >
            <h1 className="text-4xl font-bold mb-8 text-right">
                {degreeData.title}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-4">
                {degreeData.subResultCategorys.map(
                    (subitem) => {
                        // درس‌های هر زیرشاخه
                        const lessons: LessonLink[] =
                            subitem.subResultCategorys.map(
                                (lesson) => ({
                                    name: lesson.title,
                                    url: `/${degree}/${subitem.uniqCode}/${lesson.uniqCode}`,
                                })
                            );

                        return (
                            <ClassCard
                                key={subitem.id}
                                className={subitem.title}
                                description={
                                    subitem.description
                                }
                                stats={mockStats}
                                lastUpdate="۳ دقیقه"
                                linkForSeeMore={`/${degree}/${subitem.uniqCode}`}
                                lessons={lessons}
                            />
                        );
                    }
                )}
            </div>
        </div>
    );
}
