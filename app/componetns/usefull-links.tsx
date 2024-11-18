import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink } from "lucide-react";

// تعریف نوع داده برای لینک‌ها
type Link = {
    title: string;
    url: string;
    description: string;
};

// لیست لینک‌های مفید (این را می‌توانید با لینک‌های مورد نظر خود جایگزین کنید)
const usefulLinks: Link[] = [
    {
        title: "گوگل",
        url: "https://www.google.com",
        description: "موتور جستجوی پیشرو جهان",
    },
    {
        title: "گیت‌هاب",
        url: "https://github.com",
        description:
            "پلتفرم میزبانی و همکاری در توسعه نرم‌افزار",
    },
    {
        title: "استک‌اورفلو",
        url: "https://stackoverflow.com",
        description: "بزرگترین جامعه برنامه‌نویسان آنلاین",
    },
    {
        title: "مستندات MDN",
        url: "https://developer.mozilla.org",
        description: "منبع جامع برای توسعه‌دهندگان وب",
    },
    {
        title: "ورسل",
        url: "https://vercel.com",
        description:
            "پلتفرم ابری برای اپلیکیشن‌های وب استاتیک و سرورلس",
    },
];

export default function UsefulLinks() {
    return (
        <Card
            dir="rtl"
            className="w-full max-w-md mx-auto p-4 my-4 text-right"
        >
            <CardHeader>
                <CardTitle className="text-right">
                    لینک‌های مفید
                </CardTitle>
                <CardDescription>
                    مجموعه‌ای از لینک‌های مفید برای
                    توسعه‌دهندگان
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] w-full pr-4">
                    <ul className="space-y-4">
                        {usefulLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">
                                            {link.title}
                                        </h3>
                                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {link.description}
                                    </p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
