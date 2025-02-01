import React from "react";
import ClassCard from "./classCard";

// Define interfaces
interface LessonLink {
    name: string;
    url: string;
}

type IconName =
    | "sampleQuestion"
    | "educationalFile"
    | "QnA"
    | "onlineTest";

interface Stat {
    label: string;
    value: number;
    iconName: IconName;
}

interface ClassData {
    className: string;
    lastUpdatedDate: string;
    timeAgo: string;
    description?: string;
    stats: Stat[];
    lessons: LessonLink[];
    href: string;
    image: string; // New property for the class image
}

interface EducationalLevel {
    levelName: string;
    numberOfClasses: number;
    levelSlug: string;
}

// Educational levels data
const educationalLevels: EducationalLevel[] = [
    {
        levelName: "ابتدایی",
        numberOfClasses: 6,
        levelSlug: "elementary",
    },
    {
        levelName: "متوسطه اول",
        numberOfClasses: 3,
        levelSlug: "middle",
    },
    {
        levelName: "متوسطه دوم",
        numberOfClasses: 3,
        levelSlug: "high",
    },
];
interface SubResultCategory {
    id: number;
    title: string;
    description: string | null;
    parentID: number | null;
    priority: number;
    visible: boolean;
    breadcrumbTitle: string;
    jsonPicture: string | null;
    countLessonHeading: number;
    subResultCategorys: SubResultCategory[];
    registerDate: string | null;
    editDate: string | null;
    uniqCode: string;
    registerTime: string;
    editTime: string;
    jsonLableTexts: string | null;
    resultJsonLables: string | null;
}

interface Entity {
    id: number;
    title: string;
    description: string;
    parentID: number | null;
    priority: number;
    visible: boolean;
    breadcrumbTitle: string;
    jsonPicture: string;
    countLessonHeading: number;
    subResultCategorys: SubResultCategory[];
    registerDate: string | null;
    editDate: string | null;
    uniqCode: string;
    registerTime: string;
    editTime: string;
    jsonLableTexts: string | null;
    resultJsonLables: string | null;
}

interface ApiResponse {
    status: string;
    statusCode: number;
    message: string;
    entities: Entity[];
    registerDate: string | null;
    editDate: string | null;
    uniqCode: string;
    registerTime: string;
    editTime: string;
    jsonLableTexts: string | null;
    resultJsonLables: string | null;
    countAllRecordTable: number;
}

// Generate mock data for each class
const generateMockData = (): ClassData[] => {
    const lessons = ["علوم", "ریاضیات", "تاریخ", "زبان"];
    const mockDataList: ClassData[] = [];

    educationalLevels.forEach((level) => {
        for (let i = 1; i <= level.numberOfClasses; i++) {
            const className = `کلاس ${i} ${level.levelName}`;
            const hoursAgo = Math.floor(Math.random() * 24);
            const timeAgo = `${hoursAgo} ساعت قبل`;
            const lastUpdatedDate = new Date(
                Date.now() - hoursAgo * 3600000
            ).toISOString();

            const stats: Stat[] = [
                {
                    label: "نمونه سوال",
                    value:
                        Math.floor(Math.random() * 1000) +
                        500,
                    iconName: "sampleQuestion",
                },
                {
                    label: "فایل آموزشی",
                    value:
                        Math.floor(Math.random() * 1000) +
                        500,
                    iconName: "educationalFile",
                },
            ];

            const lessonLinks: LessonLink[] = lessons.map(
                (lesson) => ({
                    name: lesson,
                    url: `/${encodeURIComponent(
                        level.levelSlug
                    )}/${i}/${encodeURIComponent(lesson)}`,
                })
            );

            const href = `/${encodeURIComponent(
                level.levelSlug
            )}/${i}`;

            // Generate a mock image URL
            const image = `/images/${level.levelSlug}-${i}.jpg`;

            mockDataList.push({
                className,
                lastUpdatedDate,
                timeAgo,
                description: `توضیحات مربوط به ${className}`,
                stats,
                lessons: lessonLinks,
                href,
                image, // Add the image URL to the class data
            });
        }
    });

    return mockDataList;
};

const mockDataList = generateMockData();
const api = "https://api.biafile.ir/Api/Categorys/Public";
async function NestedCardClasses() {
    const classData: ApiResponse = await fetch(api).then(
        (result) => result.json()
    );
    const lessons = null;
    console.log(classData.entities);
    console.log("gg");
    https: return (
        <>
            <div>
                {classData.entities.map((item) => (
                    <div
                        className="py-2 my-2"
                        key={item.id}
                    >
                        <h2>{item.title}</h2>{" "}
                        {/* Render the item.title inside an element */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 px-4">
                            {item.subResultCategorys.map(
                                (subitem) => (
                                    <ClassCard
                                        key={subitem.id}
                                        description={
                                            subitem.description ||
                                            null
                                        }
                                        href={
                                            subitem.title
                                                ? `${subitem.title}`
                                                : "/"
                                        } // No need to call `.toString()` if it's a string already
                                        lessons={subitem.subResultCategorys.map(
                                            (lesson) => ({
                                                name: lesson.title, // Use lesson.title for the name
                                                url:
                                                    lesson.title +
                                                    "/" +
                                                    subitem.title, // Use lesson.title for the url or modify this as needed
                                            })
                                        )}
                                    />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* <div>
                {educationalLevels.map((level) => {
                    const classesForLevel =
                        mockDataList.filter((data) =>
                            data.className.includes(
                                level.levelName
                            )
                        );

                    return (
                        <section
                            key={level.levelName}
                            className="my-8"
                        >
                            <h2 className="text-2xl font-bold mb-6 px-4">
                                {level.levelName}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                                {classesForLevel.map(
                                    (data, index) => (
                                        <ClassCard
                                            key={index}
                                            className={
                                                data.className
                                            }
                                            lastUpdatedDate={
                                                data.lastUpdatedDate
                                            }
                                            timeAgo={
                                                data.timeAgo
                                            }
                                            description={
                                                data.description
                                            }
                                            stats={
                                                data.stats
                                            }
                                            lessons={
                                                data.lessons
                                            }
                                            href={data.href}
                                            image={
                                                data.image
                                            } // Pass the image URL to ClassCard
                                        />
                                    )
                                )}
                            </div>
                        </section>
                    );
                })}
            </div> */}
        </>
    );
}

export default NestedCardClasses;
