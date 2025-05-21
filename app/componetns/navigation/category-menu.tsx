"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ModeToggle";

interface CategoryEntity {
    id: number;
    title: string;
    uniqCode: string;
    subResultCategorys: CategoryEntity[];
}

export function CategoryMenu() {
    const [categories, setCategories] = useState<
        CategoryEntity[]
    >([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const raw = await fetch(
                    "https://api.biafile.ir/Api/Categorys/Public"
                ).then((r) => r.json());
                setCategories(raw.entities);
            } catch (error) {
                console.error(
                    "Error fetching categories:",
                    error
                );
            }
        }
        fetchCategories();

        const checkMobile = () =>
            setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () =>
            window.removeEventListener(
                "resize",
                checkMobile
            );
    }, []);

    const renderDesktopCategory = (
        cat: CategoryEntity,
        parentPath = ""
    ) => {
        const path = `${parentPath}/${cat.uniqCode}`;
        if (!cat.subResultCategorys.length) {
            return (
                <MenubarItem key={cat.id}>
                    <Link href={path}>{cat.title}</Link>
                </MenubarItem>
            );
        }
        return (
            <MenubarSub key={cat.id}>
                <MenubarSubTrigger>
                    {cat.title}
                </MenubarSubTrigger>
                <MenubarSubContent className="bg-blue-100 dark:bg-primary-foreground/80 text-primary dark:text-primary">
                    {cat.subResultCategorys.map((sub) =>
                        renderDesktopCategory(sub, path)
                    )}
                </MenubarSubContent>
            </MenubarSub>
        );
    };

    const renderMobileCategory = (
        cat: CategoryEntity,
        parentPath = ""
    ) => {
        const path = `${parentPath}/${cat.uniqCode}`;
        if (!cat.subResultCategorys.length) {
            return (
                <Link
                    key={cat.id}
                    href={path}
                    className="block py-2 px-4"
                >
                    {cat.title}
                </Link>
            );
        }
        return (
            <AccordionItem
                key={cat.id}
                value={cat.id.toString()}
            >
                <AccordionTrigger>
                    {cat.title}
                </AccordionTrigger>
                <AccordionContent>
                    {cat.subResultCategorys.map((sub) =>
                        renderMobileCategory(sub, path)
                    )}
                </AccordionContent>
            </AccordionItem>
        );
    };

    const DesktopMenu = () => (
        <Menubar className="bg-transparent shadow-none border-none">
            {categories.map((cat) => (
                <MenubarMenu key={cat.id}>
                    {!cat.subResultCategorys.length ? (
                        <Link
                            href={`/${cat.uniqCode}`}
                            passHref
                        >
                            <MenubarTrigger asChild>
                                <div className="cursor-pointer">
                                    {cat.title}
                                </div>
                            </MenubarTrigger>
                        </Link>
                    ) : (
                        <>
                            <MenubarTrigger>
                                {cat.title}{" "}
                                <ChevronDown className="inline-block ml-1 w-4 h-4" />
                            </MenubarTrigger>
                            <MenubarContent className="bg-blue-100 dark:bg-primary-foreground/80 text-primary dark:text-primary">
                                {cat.subResultCategorys.map(
                                    (sub) =>
                                        renderDesktopCategory(
                                            sub,
                                            `/${cat.uniqCode}`
                                        )
                                )}
                            </MenubarContent>
                        </>
                    )}
                </MenubarMenu>
            ))}

            <MenubarMenu>
                <MenubarTrigger>بیشتر</MenubarTrigger>
                <MenubarContent className="bg-blue-100 dark:bg-primary-foreground/80 text-primary dark:text-primary">
                    <MenubarItem>
                        <Link href="/aboutus">
                            درباره‌ی ما
                        </Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href="/contactus">
                            تماس با ما
                        </Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href="/blog">مجله</Link>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );

    const MobileMenu = () => (
        <>
            <div className="mx-4">
                <ThemeToggle />
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-primary/70 dark:bg-primary-foreground/75"
                    >
                        <Menu className="w-4 h-4" />
                        <span className="sr-only">
                            Toggle menu
                        </span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <form className="relative my-5">
                        <Input
                            type="search"
                            placeholder="جستجو..."
                            className="pl-8 pr-2 py-1 rounded-full"
                        />
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4" />
                    </form>
                    <div className="text-end flex flex-col gap-y-2 px-4">
                        <Link
                            href="/aboutus"
                            className="py-2 block hover:text-primary"
                        >
                            درباره‌ی ما
                        </Link>
                        <Link
                            href="/contactus"
                            className="py-2 block hover:text-primary"
                        >
                            تماس با ما
                        </Link>
                        <Link
                            href="/blog"
                            className="py-2 block hover:text-primary"
                        >
                            مجله
                        </Link>
                    </div>
                    <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
                        <Accordion
                            type="multiple"
                            className="w-full"
                        >
                            {categories.map((cat) =>
                                renderMobileCategory(
                                    cat,
                                    ""
                                )
                            )}
                        </Accordion>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    );

    return isMobile ? <MobileMenu /> : <DesktopMenu />;
}
