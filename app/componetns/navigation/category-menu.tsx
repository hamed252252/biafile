"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
} from "@/components/ui/menubar";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ModeToggle";

type Category = {
    id: number;
    title: string;
    subResultCategorys?: Category[];
};

export function CategoryMenu() {
    const [categories, setCategories] = React.useState<
        Category[]
    >([]);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(
                    "https://api.biafile.ir/Api/Categorys/Public"
                );
                const data = await response.json();

                if (data.status === "success") {
                    setCategories(data.entities);
                } else {
                    console.error(
                        "Failed to fetch categories:",
                        data.message
                    );
                }
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

    const renderDesktopCategory = (category: Category) => {
        if (
            !category.subResultCategorys ||
            category.subResultCategorys.length === 0
        ) {
            return (
                <MenubarItem key={category.id}>
                    <Link
                        href={`/category/${category.id}`}
                        className="w-full block"
                    >
                        {category.title}
                    </Link>
                </MenubarItem>
            );
        }

        return (
            <MenubarSub key={category.id}>
                <MenubarSubTrigger>
                    {category.title}
                </MenubarSubTrigger>
                <MenubarSubContent className="bg-blue-100 dark:bg-primary-foreground">
                    {category.subResultCategorys.map(
                        renderDesktopCategory
                    )}
                </MenubarSubContent>
            </MenubarSub>
        );
    };

    const renderMobileCategory = (category: Category) => {
        if (
            !category.subResultCategorys ||
            category.subResultCategorys.length === 0
        ) {
            return (
                <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block py-2 px-4"
                >
                    {category.title}
                </Link>
            );
        }

        return (
            <AccordionItem
                key={category.id}
                value={category.id.toString()}
            >
                <AccordionTrigger>
                    {category.title}
                </AccordionTrigger>
                <AccordionContent>
                    {category.subResultCategorys.map(
                        renderMobileCategory
                    )}
                </AccordionContent>
            </AccordionItem>
        );
    };

    const DesktopMenu = () => (
        <Menubar className="border-none shadow-none bg-transparent">
            {categories.map((category) => (
                <MenubarMenu key={category.id}>
                    {!category.subResultCategorys ||
                    category.subResultCategorys.length ===
                        0 ? (
                        <Link
                            href={`/category/${category.id}`}
                            passHref
                        >
                            <MenubarTrigger asChild>
                                <div className="cursor-pointer">
                                    {category.title}
                                </div>
                            </MenubarTrigger>
                        </Link>
                    ) : (
                        <>
                            <MenubarTrigger>
                                {category.title}
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </MenubarTrigger>
                            <MenubarContent className="bg-blue-100 dark:bg-primary-foreground text-primary dark:text-primary-foreground">
                                {category.subResultCategorys.map(
                                    renderDesktopCategory
                                )}
                            </MenubarContent>
                        </>
                    )}
                </MenubarMenu>
            ))}
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
                        className="bg-primary/70 dark:bg-primary-foreground/75 "
                        variant="outline"
                        size="icon"
                    >
                        <Menu className="h-4 w-4" />
                        <span className="sr-only">
                            Toggle menu
                        </span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <form className="relative my-5">
                        <Input
                            type="search"
                            placeholder="جستجو..."
                            className="pl-8 pr-2 py-1 rounded-full"
                        />
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                    </form>

                    <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
                        <Accordion
                            type="multiple"
                            className="w-full"
                        >
                            {categories.map(
                                renderMobileCategory
                            )}
                        </Accordion>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    );

    return isMobile ? <MobileMenu /> : <DesktopMenu />;
}
