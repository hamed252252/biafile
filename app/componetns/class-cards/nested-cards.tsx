import React from "react";
import Link from "next/link";
import ClassCard, { Stat } from "./classCard";

/* ------------------- انواع برگشتی API (ساده‌شده) ------------------- */
interface SubResultCategory {
    id: number;
    title: string;
    description: string | null;
    uniqCode: string;
    subResultCategorys: SubResultCategory[];
}

interface Entity extends SubResultCategory {
    countLessonHeading: number;
}

interface ApiResponseCategorysCategorys {
    entities: Entity[];
}
/* ------------------------------------------------------------------- */

const API_URL =
    "https://api.biafile.ir/Api/Categorys/Public";

async function NestedCardClasses() {
    const data: ApiResponseCategorysCategorys = await fetch(
        API_URL,
        {
            next: { revalidate: 3600 }, // کش سرور یک ساعته
        }
    ).then((r) => r.json());

    /** آمار جعلی برای هر کارت ـ تا زمانی که API واقعی داشته باشید */
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

    return (
        <section>
            {data.entities.map((entity) => (
                <div
                    key={entity.id}
                    className="py-2 my-6"
                >
                    <h2 className="font-bold mr-4">
                        <Link href={entity.uniqCode}>
                            {entity.title}
                        </Link>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-4">
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
                                />
                            )
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
}

export default NestedCardClasses;
