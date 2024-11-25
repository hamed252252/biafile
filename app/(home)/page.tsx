import React from "react";
import HeroSection from "../componetns/hero-section";
import ClassCard from "../componetns/classCard";
import RssComponent from "../componetns/rss";
import UsefulLinks from "../componetns/usefull-links";

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

const Home: React.FC = () => {
    return (
        <div className="bg-background text-foreground">
            <HeroSection />
            {educationalLevels.map((level) => {
                const classesForLevel = mockDataList.filter(
                    (data) =>
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
                                        stats={data.stats}
                                        lessons={
                                            data.lessons
                                        }
                                        href={data.href}
                                        image={data.image} // Pass the image URL to ClassCard
                                    />
                                )
                            )}
                        </div>
                    </section>
                );
            })}
            <RssComponent />
            <UsefulLinks />
        </div>
    );
};

export default Home;
