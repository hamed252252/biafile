"use client";
import logoImage from "@/public/logo.svg";
import * as React from "react";
import Link from "next/link";
import {
    Book,
    ChevronDown,
    ChevronRight,
    Menu,
    Search,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
} from "@/components/ui/menubar";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MdAccountCircle } from "react-icons/md";
import Image from "next/image";

interface LinkItem {
    href: string;
    label: string;
}

const courseLinks: {
    [key: string]: { [key: string]: LinkItem[] };
} = {
    دبستان: {
        اول: [
            {
                href: "/courses/elementary/first/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/elementary/first/science",
                label: "علوم",
            },
            {
                href: "/courses/elementary/first/history",
                label: "تاریخ",
            },
            {
                href: "/courses/elementary/first/language",
                label: "زبان‌ها",
            },
        ],
        دوم: [
            {
                href: "/courses/elementary/second/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/elementary/second/science",
                label: "علوم",
            },
            {
                href: "/courses/elementary/second/history",
                label: "تاریخ",
            },
            {
                href: "/courses/elementary/second/language",
                label: "زبان‌ها",
            },
        ],
        سوم: [
            {
                href: "/courses/elementary/third/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/elementary/third/science",
                label: "علوم",
            },
            {
                href: "/courses/elementary/third/history",
                label: "تاریخ",
            },
            {
                href: "/courses/elementary/third/language",
                label: "زبان‌ها",
            },
        ],
        چهارم: [
            {
                href: "/courses/elementary/fourth/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/elementary/fourth/science",
                label: "علوم",
            },
            {
                href: "/courses/elementary/fourth/history",
                label: "تاریخ",
            },
            {
                href: "/courses/elementary/fourth/language",
                label: "زبان‌ها",
            },
        ],
        پنجم: [
            {
                href: "/courses/elementary/fifth/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/elementary/fifth/science",
                label: "علوم",
            },
            {
                href: "/courses/elementary/fifth/history",
                label: "تاریخ",
            },
            {
                href: "/courses/elementary/fifth/language",
                label: "زبان‌ها",
            },
        ],
        ششم: [
            {
                href: "/courses/elementary/sixth/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/elementary/sixth/science",
                label: "علوم",
            },
            {
                href: "/courses/elementary/sixth/history",
                label: "تاریخ",
            },
            {
                href: "/courses/elementary/sixth/language",
                label: "زبان‌ها",
            },
        ],
    },
    "متوسطه ی اول": {
        اول: [
            {
                href: "/courses/middle/first/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/middle/first/science",
                label: "علوم",
            },
            {
                href: "/courses/middle/first/history",
                label: "تاریخ",
            },
            {
                href: "/courses/middle/first/language",
                label: "زبان‌ها",
            },
        ],
        دوم: [
            {
                href: "/courses/middle/second/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/middle/second/science",
                label: "علوم",
            },
            {
                href: "/courses/middle/second/history",
                label: "تاریخ",
            },
            {
                href: "/courses/middle/second/language",
                label: "زبان‌ها",
            },
        ],
        سوم: [
            {
                href: "/courses/middle/third/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/middle/third/science",
                label: "علوم",
            },
            {
                href: "/courses/middle/third/history",
                label: "تاریخ",
            },
            {
                href: "/courses/middle/third/language",
                label: "زبان‌ها",
            },
        ],
    },
    "متوسطه ی دوم": {
        اول: [
            {
                href: "/courses/high/first/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/high/first/science",
                label: "علوم",
            },
            {
                href: "/courses/high/first/history",
                label: "تاریخ",
            },
            {
                href: "/courses/high/first/language",
                label: "زبان‌ها",
            },
        ],
        دوم: [
            {
                href: "/courses/high/second/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/high/second/science",
                label: "علوم",
            },
            {
                href: "/courses/high/second/history",
                label: "تاریخ",
            },
            {
                href: "/courses/high/second/language",
                label: "زبان‌ها",
            },
        ],
        سوم: [
            {
                href: "/courses/high/third/math",
                label: "ریاضیات",
            },
            {
                href: "/courses/high/third/science",
                label: "علوم",
            },
            {
                href: "/courses/high/third/history",
                label: "تاریخ",
            },
            {
                href: "/courses/high/third/language",
                label: "زبان‌ها",
            },
        ],
    },
};

export default function Component() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenAvatar, setIsOpenAvatar] =
        React.useState(false);

    return (
        <nav className="bg-primary text-primary-foreground rtl font-sans">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* بخش لوگو */}
                    <div className="md:block hidden">
                        <Link
                            href="/"
                            className="flex items-center"
                        >
                            <Image
                                alt="logo"
                                width={45}
                                height={45}
                                src={logoImage}
                            />
                            {/* <Book className="h-8 w-8 ml-2" /> */}
                            <span className="text-xl font-bold">
                                بیافایل
                            </span>
                        </Link>
                    </div>

                    {/* منوی دسکتاپ */}
                    <Menubar className="hidden md:flex items-center border-none space-x-4 rtl:space-x-reverse bg-transparent shadow-none">
                        <Link
                            href="/aboutus"
                            className="hover:text-secondary-foreground"
                        >
                            درباره ما
                        </Link>
                        <Link
                            href="/contactus"
                            className="hover:text-secondary-foreground"
                        >
                            تماس با ما
                        </Link>
                        {Object.entries(courseLinks).map(
                            ([level, grades]) => (
                                <MenubarMenu key={level}>
                                    <MenubarTrigger className="flex items-center">
                                        {level}
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    </MenubarTrigger>
                                    <MenubarContent className="bg-primary-foreground text-primary shadow-lg rounded p-2 space-y-2">
                                        {Object.entries(
                                            grades
                                        ).map(
                                            ([
                                                grade,
                                                links,
                                            ]) => (
                                                <MenubarSub
                                                    key={
                                                        grade
                                                    }
                                                >
                                                    <MenubarSubTrigger className="flex items-center">
                                                        {
                                                            grade
                                                        }
                                                    </MenubarSubTrigger>
                                                    <MenubarSubContent className="bg-primary-foreground text-primary shadow-lg rounded p-2 space-y-2">
                                                        {links.map(
                                                            ({
                                                                href,
                                                                label,
                                                            }) => (
                                                                <MenubarItem
                                                                    asChild
                                                                    key={
                                                                        href
                                                                    }
                                                                >
                                                                    <Link
                                                                        href={
                                                                            href
                                                                        }
                                                                        className="block px-2 py-1 hover:bg-primary hover:text-primary-foreground rounded"
                                                                    >
                                                                        {
                                                                            label
                                                                        }
                                                                    </Link>
                                                                </MenubarItem>
                                                            )
                                                        )}
                                                    </MenubarSubContent>
                                                </MenubarSub>
                                            )
                                        )}
                                    </MenubarContent>
                                </MenubarMenu>
                            )
                        )}
                    </Menubar>

                    {/* بخش جستجو و آیکون کاربر */}
                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        <form className="relative">
                            <Input
                                type="search"
                                placeholder="جستجو..."
                                className="pl-8 pr-2 py-1 rounded-full bg-primary-foreground text-primary"
                            />
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                        </form>
                        <div dir="rtl">
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    asChild
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-primary-foreground p-2 w-40 text-primary shadow-lg rounded space-y-4 text-right ">
                                    <DropdownMenuLabel className="text-primary">
                                        حساب کاربری من
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuGroup className="text-primary/75">
                                        <DropdownMenuItem>
                                            <Link href="/profile">
                                                حساب کاربری
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/settings">
                                                تنظیمات
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/logout">
                                                خروج
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* منوی موبایل با Sheet */}
                    <div className="md:hidden rtl:flex-row-reverse">
                        <Sheet
                            modal
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-primary-foreground"
                                >
                                    <Menu className="h-8 w-8" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[300px] sm:w-[400px] rtl"
                            >
                                <form className="relative mt-5">
                                    <Input
                                        type="search"
                                        placeholder="جستجو..."
                                        className="pl-8 pr-2 py-1 rounded-full"
                                    />
                                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                                </form>
                                <nav className="flex flex-col mt-4 space-y-4 rtl:space-x-reverse">
                                    {Object.entries(
                                        courseLinks
                                    ).map(
                                        ([
                                            level,
                                            grades,
                                        ]) => (
                                            <details
                                                key={level}
                                                className="flex flex-col"
                                            >
                                                <summary className="font-bold cursor-pointer">
                                                    {level}
                                                </summary>
                                                {Object.entries(
                                                    grades
                                                ).map(
                                                    ([
                                                        grade,
                                                        links,
                                                    ]) => (
                                                        <details
                                                            key={
                                                                grade
                                                            }
                                                            className="ml-4"
                                                        >
                                                            <summary className="font-semibold cursor-pointer">
                                                                {
                                                                    grade
                                                                }
                                                            </summary>
                                                            <div className="flex flex-col ml-4">
                                                                {links.map(
                                                                    ({
                                                                        href,
                                                                        label,
                                                                    }) => (
                                                                        <Link
                                                                            key={
                                                                                href
                                                                            }
                                                                            href={
                                                                                href
                                                                            }
                                                                            className="block hover:text-secondary-foreground ml-4"
                                                                        >
                                                                            {
                                                                                label
                                                                            }
                                                                        </Link>
                                                                    )
                                                                )}
                                                            </div>
                                                        </details>
                                                    )
                                                )}
                                            </details>
                                        )
                                    )}
                                    <Link href="/aboutus">
                                        درباره ما
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="md:hidden mx-auto">
                        <Link
                            href="/"
                            className="flex items-center"
                        >
                            <Image
                                alt="logo"
                                width={45}
                                height={45}
                                quality={100}
                                src={logoImage}
                            />
                            {/* <span className="text-xl font-bold">
                                بیافایل
                            </span> */}
                        </Link>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() =>
                                setIsOpenAvatar(
                                    !isOpenAvatar
                                )
                            }
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground"
                            aria-label="User menu"
                        >
                            <User className="w-5 h-5" />
                        </button>
                        {isOpenAvatar && (
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-popover text-popover-foreground">
                                <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                >
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm hover:bg-muted"
                                        onClick={() =>
                                            setIsOpenAvatar(
                                                false
                                            )
                                        }
                                    >
                                        حساب کاربری
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="block px-4 py-2 text-sm hover:bg-muted"
                                        onClick={() =>
                                            setIsOpenAvatar(
                                                false
                                            )
                                        }
                                    >
                                        تنظیمات
                                    </Link>
                                    <Link
                                        href="/logout"
                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-muted"
                                        onClick={() =>
                                            setIsOpenAvatar(
                                                false
                                            )
                                        }
                                    >
                                        خروج
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
