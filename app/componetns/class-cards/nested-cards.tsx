import React from "react";
import ClassCard from "./classCard";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlineVideoFile } from "react-icons/md";
import { TbPencilQuestion } from "react-icons/tb";
import { LuTestTube } from "react-icons/lu";

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
const icons = {
    sampleQuestion: FaRegQuestionCircle,
    educationalFile: MdOutlineVideoFile,
    QnA: TbPencilQuestion,
    onlineTest: LuTestTube,
};

// Generate mock data for each class

const api = "https://api.biafile.ir/Api/Categorys/Public";
async function NestedCardClasses() {
    const classData: ApiResponse = await fetch(api).then(
        (result) => result.json()
    );
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

    https: return (
        <>
            <div>
                {classData.entities.map((item) => (
                    <div
                        className="py-2 my-6"
                        key={item.id}
                    >
                        <h2>{item.title}</h2>{" "}
                        {/* Render the item.title inside an element */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                            {item.subResultCategorys.map(
                                (subitem) => (
                                    <ClassCard
                                        stats={mockStats.map(
                                            (
                                                state: Stat
                                            ) => ({
                                                label: state.label,
                                                iconName:
                                                    state.iconName,
                                                value: state.value,
                                            })
                                        )}
                                        timeAgo={"3 دقیقه"}
                                        className={
                                            subitem.title
                                        }
                                        key={subitem.id}
                                        description={
                                            subitem.description ||
                                            null
                                        }
                                        href={
                                            subitem.title
                                                ? `${item.title}/${subitem.title}`
                                                : "/"
                                        } // No need to call `.toString()` if it's a string already
                                        lessons={subitem.subResultCategorys.map(
                                            (lesson) => ({
                                                name: lesson.title, // Use lesson.title for the name
                                                url:
                                                    subitem.title +
                                                    "/" +
                                                    lesson.title, // Use lesson.title for the url or modify this as needed
                                            })
                                        )}
                                    />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default NestedCardClasses;
