"use client";
import logoImage from "@/public/logo.svg";
import * as React from "react";
import Link from "next/link";
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

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
import Image from "next/image";
import { courseLinks } from "../lib/mockData";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"; // فرض کنید که این کامپوننت‌های آکاردئون وجود دارند یا از کتابخانه شبیه به آن استفاده می‌کنید.
const DynamicAccordion = ({
    courseLinks,
}: {
    courseLinks: Record<
        string,
        Record<string, { href: string; label: string }[]>
    >;
}) => {
    return (
        <Accordion
            type="multiple"
            className="w-full"
        >
            {Object.entries(courseLinks).map(
                ([level, grades]) => (
                    <AccordionItem
                        key={level}
                        value={level}
                        className="border-b border-gray-200"
                    >
                        <AccordionTrigger className="flex items-center justify-between font-bold text-lg py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
                            <span>{level}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pl-6 mt-2">
                            {Object.entries(grades).map(
                                ([grade, links]) => (
                                    <Accordion
                                        key={grade}
                                        type="single"
                                        collapsible
                                    >
                                        <AccordionItem
                                            value={grade}
                                        >
                                            <AccordionTrigger className="flex items-center justify-between font-medium text-base py-2 px-3 hover:bg-gray-100 rounded-md transition-all">
                                                <span>
                                                    {grade}
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col ml-4 gap-3 mt-2">
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
                                                                className="block text-sm text-primary hover:text-secondary-foreground hover:underline transition-all"
                                                            >
                                                                {
                                                                    label
                                                                }
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                )
                            )}
                        </AccordionContent>
                    </AccordionItem>
                )
            )}
        </Accordion>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-gradient-to-r from-primary to-primary/85 hover:text-white focus:bg-gradient-to-r focus:from-purple-400 focus:to-indigo-500 focus:text-white shadow-md",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-xs leading-snug text-gray-600">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

const hoverMenu =
    "hover:text-secondary-foreground hover:scale-125 ease-in-out duration-700";

export default function NavigationMenuComponents() {
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
                    <NavigationMenu className="hidden md:flex items-center border-none space-x-6 rtl:space-x-reverse bg-transparent shadow-none">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link
                                    href="/blog"
                                    legacyBehavior
                                    passHref
                                >
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "text-lg font-semibold text-primary-foreground bg-transparent hover:text-indigo-600",
                                            hoverMenu
                                        )}
                                    >
                                        مجله
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            {Object.entries(
                                courseLinks
                            ).map(([level, grades]) => (
                                <NavigationMenuItem
                                    key={level}
                                >
                                    <NavigationMenuTrigger
                                        className={cn(
                                            "group text-lg bg-transparent font-semibold text-primary-foreground hover:text-indigo-600",
                                            hoverMenu
                                        )}
                                    >
                                        {level}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-4 text-black p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] bg-white rounded-xl shadow-lg border border-gray-200">
                                            {Object.entries(
                                                grades
                                            ).map(
                                                ([
                                                    grade,
                                                    links,
                                                ]) => (
                                                    <li
                                                        key={
                                                            grade
                                                        }
                                                        className="row-span-3"
                                                    >
                                                        <div className="flex h-full w-full flex-col justify-start p-5 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                                                            <div className="mb-3 text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">
                                                                {
                                                                    grade
                                                                }
                                                            </div>
                                                            <ul className="space-y-2">
                                                                {links.map(
                                                                    ({
                                                                        href,
                                                                        label,
                                                                    }) => (
                                                                        <ListItem
                                                                            key={
                                                                                href
                                                                            }
                                                                            href={
                                                                                href
                                                                            }
                                                                            title={
                                                                                label
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

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
                                <DropdownMenuContent className="bg-primary-foreground z-10 p-2 w-40 text-black shadow-lg rounded space-y-4 text-right ">
                                    <DropdownMenuLabel className="text-primary">
                                        حساب کاربری من
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuGroup className="text-primary/75">
                                        <DropdownMenuItem>
                                            <Link href="/dashboard">
                                                حساب کاربری
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/dashboard/account/settings">
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
                                    <DynamicAccordion
                                        courseLinks={
                                            courseLinks
                                        }
                                    />
                                    <Link href="/aboutus">
                                        درباره ما
                                    </Link>
                                    <Link href="/blog">
                                        مجله
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
                        </Link>
                    </div>
                    <div className="relative md:hidden">
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
                            <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-popover text-primary bg-white">
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
