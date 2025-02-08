import { notFound } from "next/navigation";
import { ApiResponseCategorysCategorys } from "@/app/componetns/class-cards/nested-cards";
import ClassCard, {
    Stat,
} from "@/app/componetns/class-cards/classCard";

export const dynamicParams = true;

interface PageProps {
    params: Promise<{ degree: string }>;
}

export default async function DegreeGradePage({
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
    console.log(item.id);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8 text-right">
                {item.title || "عنوان یافت نشد"}
            </h1>
            <div className="grid grid-cols-1 gap-4">
                {filteredData.map((item) => (
                    <ClassCard
                        key={item.uniqCode}
                        LinkForSeeMore={`/${degree}/${item.uniqCode} `}
                        className={item.title}
                        description={
                            item.description ||
                            "توضیحات موجود نیست"
                        }
                        href={`/${degree}/${item.uniqCode}`}
                        lessons={item.subResultCategorys.map(
                            (lesson) => ({
                                name: lesson.title, // Use lesson.title for the name
                                url:
                                    degree +
                                    "/" +
                                    lesson.uniqCode, // Use lesson.title for the url or modify this as needed
                            })
                        )}
                        stats={mockStats.map(
                            (state: Stat) => ({
                                label: state.label,
                                iconName: state.iconName,
                                value: state.value,
                            })
                        )}
                        timeAgo={"3 دقیقه"}
                    />
                ))}
            </div>
        </div>
    );
}
