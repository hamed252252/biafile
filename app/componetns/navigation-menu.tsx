"use client";
import logoImage from "@/public/logo.svg";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    ChevronDown,
    Menu,
    Search,
    User,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { CategoryMenu } from "./navigation/category-menu";
import { ThemeToggle } from "@/components/ModeToggle";

export default function NavigationMenuComponents() {
    return (
        <nav className="bg-primary/85 border-b-1 shadow-sm  drop-shadow-sm rounded-b-2xl mb-1   shadow-slate-500 dark:bg-muted dark:text-muted-foreground text-primary-foreground  font-sans ">
            <div className="container mx-auto px-4 ">
                <div className="flex items-center justify-between h-16">
                    <div className="">
                        <Link href="/">
                            <div className="flex items-center">
                                <Image
                                    alt="logo"
                                    width={45}
                                    height={45}
                                    src={logoImage}
                                />
                                <span className="text-xl font-bold ">
                                    بیافایل
                                </span>
                            </div>
                        </Link>
                    </div>
                    <Menubar className=" md:flex bg-transparent rounded-none border-none shadow-none items-center">
                        <CategoryMenu />
                    </Menubar>

                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        <form className="relative">
                            <Input
                                type="search"
                                placeholder="جستجو..."
                                className="pl-8 pr-2 py-1 rounded-full bg-primary-foreground text-primary"
                            />
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                        </form>
                        <Link href={"/dashboard"}>
                            <Button variant="ghost">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
