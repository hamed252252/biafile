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
import { MdAccountCircle } from "react-icons/md";
import Image from "next/image";
import { courseLinks } from "../lib/mockData";
import { cn } from "@/lib/utils";

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
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                    <NavigationMenu className="hidden md:flex items-center border-none space-x-4 rtl:space-x-reverse bg-primary text-black shadow-none">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link
                                    href="/blog"
                                    legacyBehavior
                                    passHref
                                >
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()} bg-transparent ${hoverMenu}`}
                                    >
                                        مجله
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            {Object.entries(
                                courseLinks
                            ).map(([level, grades]) => (
                                <NavigationMenuItem
                                    className="bg-transparent"
                                    key={level}
                                >
                                    <NavigationMenuTrigger
                                        className={`group bg-transparent ${hoverMenu} `}
                                    >
                                        {level}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
                                                        <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                                {
                                                                    grade
                                                                }
                                                            </div>
                                                            <ul className="space-y-1">
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
                                <DropdownMenuContent className="bg-primary-foreground z-10 p-2 w-40 text-primary shadow-lg rounded space-y-4 text-right ">
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
                            <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-popover text-popover-foreground">
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
