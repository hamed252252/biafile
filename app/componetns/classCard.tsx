// components/ClassCard.tsx
import React from "react";

// تعریف اینترفیس برای نوع داده‌ها
interface ClassCardProps {
    className: string;
    timeAgo: string;
    description: string;
    stats: {
        label: string;
        value: number;
    }[];
    bestSellers: {
        rank: number;
        title: string;
    }[];
}

const ClassCard: React.FC<ClassCardProps> = ({
    className,
    timeAgo,
    description,
    stats,
    bestSellers,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg m-4 p-4 my-2 w-full max-w-xs">
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm">
                    {timeAgo}
                </span>
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    {className}
                </span>
            </div>
            <h3 className="text-purple-700 text-lg font-semibold mb-2">
                {description}
            </h3>
            <a
                href="#"
                className="text-blue-500 text-sm underline"
            >
                بیشتر
            </a>

            <div className="grid grid-cols-4 gap-2 text-center my-4">
                {stats.map((stat, index) => (
                    <div key={index}>
                        <p className="text-gray-600 text-xs">
                            {stat.label}
                        </p>
                        <p className="text-black font-bold">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block">
                پرفروش‌ترین‌ها
            </div>

            <ul className="text-gray-700 text-sm space-y-2">
                {bestSellers.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center"
                    >
                        <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                            {item.rank}
                        </span>
                        <p className="ml-2">{item.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClassCard;
