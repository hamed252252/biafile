import { notFound } from "next/navigation";
import { ApiResponseCategorysCategorys } from "@/app/componetns/class-cards/nested-cards";
import ClassCard, {
    Stat,
} from "@/app/componetns/class-cards/classCard";

export const dynamicParams = true;

interface PageProps {
    params: Promise<{ degree: string }>;
}

export default async function DegreePage({
    params,
}: PageProps) {
    const { degree } = await params;

    // Fetch class data
    const classData: ApiResponseCategorysCategorys =
        await fetch(
            `https://api.biafile.ir/Api/Categorys/Public`
        ).then((res) => res.json());

    // Mock stats
    const mockStats: Stat[] = [
        {
            label: "نمونه سوالات",
            value: 20,
            iconName: "sampleQuestion",
        },
        {
            label: "فایل های آموزشی",
            value: 15,
            iconName: "educationalFile",
        },
    ];

    // Filter data by uniqCode
    const filteredData = classData.entities.filter(
        (item) => item.uniqCode === degree
    );

    if (filteredData.length === 0) {
        notFound();
    }

    const item = filteredData[0]; // Since uniqCode is unique, there should be only one match

    return (
        <div className=" mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8 text-right">
                {item.title || "عنوان یافت نشد"}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-4">
                {item.subResultCategorys.map((subitem) => (
                    <ClassCard
                        stats={mockStats}
                        timeAgo={"3 دقیقه"}
                        className={subitem.title}
                        key={subitem.id}
                        description={
                            subitem.description || null
                        }
                        LinkForSeeMore={`${item.uniqCode}/${subitem.uniqCode}`}
                        href={
                            subitem.title
                                ? `${item.uniqCode}/${subitem.uniqCode}`
                                : "/"
                        }
                        lessons={subitem.subResultCategorys.map(
                            (lesson) => ({
                                name: lesson.title,
                                url: `${item.uniqCode}/${subitem.uniqCode}/${lesson.uniqCode}`,
                            })
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
