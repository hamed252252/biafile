import ClassCard from "../componetns/classCard";
import HeroSection from "../componetns/hero-section";

// داده‌های نمونه برای پایه‌های اول تا ششم
const mockDataList = [
    {
        className: "کلاس اول",
        timeAgo: "۱۹ ساعت قبل",
        description: "ریاضی، علوم تجربی، فارسی، نگارش...",
        stats: [
            { label: "نمونه سوال", value: 1995 },
            { label: "فایل آموزشی", value: 1369 },
            { label: "پرسش و پاسخ", value: 156 },
            { label: "آزمون آنلاین", value: 110 },
        ],
        lessons: [
            "کتاب کار و تمرین درس ۱۲ تا ۱۳ فارسی و نگارش اول ابتدایی",
            "آزمون فارسی اول دبستان تا نشانه ی م",
            "کتاب کار مجموعه تمرین‌های طلایی موضوع فارسی اول دبستان از تمرین ۱۴ تا ۲۲",
        ],
    },
    {
        className: "کلاس دوم",
        timeAgo: "۱۸ ساعت قبل",
        description: "ریاضی، علوم تجربی، فارسی، نگارش...",
        stats: [
            { label: "نمونه سوال", value: 2117 },
            { label: "فایل آموزشی", value: 1586 },
            { label: "پرسش و پاسخ", value: 184 },
            { label: "آزمون آنلاین", value: 201 },
        ],
        lessons: [
            "سری ارزیابی فصل دوم ریاضی پایه دوم دبستان بهار آزادی",
            "آزمونک پایانی دوم دبستان شهدا، فصل ۲: جمع و تفریق اعداد",
            "آزمون درس ۲ فارسی و نگارش دوم ابتدایی",
        ],
    },
    {
        className: "کلاس سوم",
        timeAgo: "۱۹ ساعت قبل",
        description: "ریاضی، علوم تجربی، فارسی، نگارش...",
        stats: [
            { label: "نمونه سوال", value: 2845 },
            { label: "فایل آموزشی", value: 2047 },
            { label: "پرسش و پاسخ", value: 444 },
            { label: "آزمون آنلاین", value: 371 },
        ],
        lessons: [
            "آزمون فصل پایان دوم ریاضی سوم دبستان امیر صادقی",
            "آزمون فصل ۲ ریاضی سوم: عددهای چهار رقمی",
            "آزمون املا و انشا خلاق فارسی سوم",
        ],
    },
    {
        className: "کلاس چهارم",
        timeAgo: "۵ ساعت قبل",
        description: "ریاضی، علوم تجربی، فارسی، نگارش...",
        stats: [
            { label: "نمونه سوال", value: 5107 },
            { label: "فایل آموزشی", value: 809 },
            { label: "پرسش و پاسخ", value: 1658 },
            { label: "آزمون آنلاین", value: 381 },
        ],
        lessons: [
            "کاربرگ فصل دوم ریاضی چهارم ابتدایی: جمع و تفریق کسرها",
            "کاربرگ تستی و مقایسه کسرها: ریاضی چهارم دبستان",
            "کاربرگ جمع و تفریق کسرها: ریاضی چهارم دبستان",
        ],
    },
    {
        className: "کلاس پنجم",
        timeAgo: "۶ ساعت قبل",
        description: "ریاضی، علوم تجربی، فارسی، نگارش...",
        stats: [
            { label: "نمونه سوال", value: 4125 },
            { label: "فایل آموزشی", value: 987 },
            { label: "پرسش و پاسخ", value: 1234 },
            { label: "آزمون آنلاین", value: 678 },
        ],
        lessons: [
            "کاربرگ حل سوالات ریاضی پنجم",
            "تست علمی درس علوم پنجم ابتدایی",
            "تمرین‌های فارسی و نگارش پنجم",
        ],
    },
    {
        className: "کلاس ششم",
        timeAgo: "۷ ساعت قبل",
        description: "ریاضی، علوم تجربی، فارسی، نگارش...",
        stats: [
            { label: "نمونه سوال", value: 6543 },
            { label: "فایل آموزشی", value: 765 },
            { label: "پرسش و پاسخ", value: 2345 },
            { label: "آزمون آنلاین", value: 987 },
        ],
        lessons: [
            "کاربرگ دروس پایه ششم",
            "تمرین‌های ریاضی ششم: جمع و تفریق",
            "پرسش و پاسخ‌های فارسی ششم ابتدایی",
        ],
    },
];

export default function Home() {
    return (
        <div>
            <HeroSection />
            <h1 className="my-2 text-2xl font-semibold p-4">
                ابتدایی
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-100 min-h-screen">
                {mockDataList.map((data, index) => (
                    <ClassCard
                        key={index}
                        className={data.className}
                        timeAgo={data.timeAgo}
                        description={data.description}
                        stats={data.stats}
                        lessons={data.lessons} // اضافه کردن لیست دروس
                    />
                ))}
            </div>
        </div>
    );
}
