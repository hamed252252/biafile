"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Link = {
    title: string;
    url: string;
    description: string;
    category: string;
};

const usefulLinks: Link[] = [
    {
        title: "گوگل",
        url: "https://www.google.com",
        description: "موتور جستجوی پیشرو جهان",
        category: "جستجو",
    },
    {
        title: "گیت‌هاب",
        url: "https://github.com",
        description:
            "پلتفرم میزبانی و همکاری در توسعه نرم‌افزار",
        category: "توسعه",
    },
    {
        title: "استک‌اورفلو",
        url: "https://stackoverflow.com",
        description: "بزرگترین جامعه برنامه‌نویسان آنلاین",
        category: "توسعه",
    },
    {
        title: "مستندات MDN",
        url: "https://developer.mozilla.org",
        description: "منبع جامع برای توسعه‌دهندگان وب",
        category: "آموزش",
    },
    {
        title: "ورسل",
        url: "https://vercel.com",
        description:
            "پلتفرم ابری برای اپلیکیشن‌های وب استاتیک و سرورلس",
        category: "هاستینگ",
    },
];

export default function UsefulLinks() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState<string | null>(null);

    const filteredLinks = usefulLinks.filter(
        (link) =>
            (link.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
                link.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) &&
            (!selectedCategory ||
                link.category === selectedCategory)
    );

    const categories = Array.from(
        new Set(usefulLinks.map((link) => link.category))
    );

    return (
        <Card
            dir="rtl"
            className="w-full max-w-2xl mx-auto p-4 my-6 text-right shadow-md transition-transform hover:scale-[1.01]"
        >
            <CardHeader>
                <CardTitle className="text-right text-2xl font-bold">
                    لینک‌های مفید
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    مجموعه‌ای از لینک‌های مفید برای
                    توسعه‌دهندگان
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-x-2 mb-4 ">
                    <Input
                        type="text"
                        placeholder="جستجو..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="flex-grow"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                        variant={
                            selectedCategory === null
                                ? "default"
                                : "outline"
                        }
                        size="sm"
                        onClick={() =>
                            setSelectedCategory(null)
                        }
                    >
                        همه
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={
                                selectedCategory ===
                                category
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() =>
                                setSelectedCategory(
                                    category
                                )
                            }
                        >
                            {category}
                        </Button>
                    ))}
                </div>
                <ScrollArea className="h-[400px] w-full pr-4">
                    <ul className="space-y-4">
                        {filteredLinks.map(
                            (link, index) => (
                                <li
                                    key={index}
                                    className="group"
                                >
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 rounded-lg bg-secondary hover:bg-secondary/90 focus:ring focus:ring-primary focus:outline-none transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                                                {link.title}
                                            </h3>
                                            <div className="flex items-center space-x-2">
                                                <Badge variant="outline">
                                                    {
                                                        link.category
                                                    }
                                                </Badge>
                                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </div>
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {
                                                link.description
                                            }
                                        </p>
                                    </a>
                                </li>
                            )
                        )}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
