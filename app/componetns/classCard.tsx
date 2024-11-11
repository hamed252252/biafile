export interface ClassCardProps {
    className: string;
    timeAgo: string;
    description: string;
    stats: {
        label: string;
        value: number;
    }[];
    lessons: string[]; // اضافه کردن دروس
}

const ClassCard: React.FC<ClassCardProps> = ({
    className,
    timeAgo,
    description,
    stats,
    lessons,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg m-4 p-4 my-2 w-full max-w-xs">
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm">
                    آخرین به روز رسانی {timeAgo}
                </span>
                <span className="bg-gradient-to-r from-primary to-primary/85  text-white text-xs p-2 rounded-full">
                    {className}
                </span>
            </div>
            <h3 className=" bg-clip-text bg-gradient-to-r text-transparent from-primary  to-primary/85 text-lg font-semibold mb-2">
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
            {/* بخش اضافه شده برای نمایش دروس */}
            <div className="my-4">
                <h4 className="text-gray-700 text-md font-semibold mb-2">
                    دروس:
                </h4>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                    {lessons.map((lesson, index) => (
                        <li key={index}>{lesson}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default ClassCard;
