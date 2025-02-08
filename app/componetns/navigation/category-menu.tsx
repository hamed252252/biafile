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
import {
    ApiResponseCategorysCategorys,
    Entity,
} from "../class-cards/nested-cards";

export function CategoryMenu() {
    const [categories, setCategories] = React.useState<
        Entity[]
    >([]);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        async function fetchCategories() {
            try {
                const response: ApiResponseCategorysCategorys =
                    await fetch(
                        "https://api.biafile.ir/Api/Categorys/Public"
                    ).then((result) => result.json());

                if (response.status === "success") {
                    setCategories(response.entities);
                } else {
                    console.error(
                        "Failed to fetch categories:",
                        response.message
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

    const renderDesktopCategory = (
        category: Entity,
        parentPath: string = ""
    ) => {
        // Construct the current path
        const currentPath = `${parentPath}/${category.uniqCode}`;

        if (
            !category.subResultCategorys ||
            category.subResultCategorys.length === 0
        ) {
            return (
                <MenubarItem
                    className=""
                    key={category.id}
                >
                    <Link
                        href={currentPath} // Use the constructed path
                        className="w-full block"
                    >
                        {category.title}
                    </Link>
                </MenubarItem>
            );
        }

        return (
            <MenubarSub key={category.id}>
                <MenubarSubTrigger className="">
                    {category.title}
                </MenubarSubTrigger>
                <MenubarSubContent className="bg-blue-100 dark:bg-primary-foreground/80 text-primary dark:text-primary">
                    {category.subResultCategorys.map(
                        (subCategory) =>
                            renderDesktopCategory(
                                {
                                    ...subCategory,
                                    description:
                                        subCategory.description ||
                                        "No description available",
                                },

                                currentPath
                            ) // Pass the current path to subcategories
                    )}
                </MenubarSubContent>
            </MenubarSub>
        );
    };

    const renderMobileCategory = (
        category: Entity,
        parentPath: string = ""
    ) => {
        // Construct the current path
        const currentPath = `${parentPath}/${category.uniqCode}`;

        if (
            !category.subResultCategorys ||
            category.subResultCategorys.length === 0
        ) {
            return (
                <Link
                    key={category.id}
                    href={currentPath} // Use the constructed path
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
                        (subCategory) =>
                            renderMobileCategory(
                                subCategory,
                                currentPath
                            ) // Pass the current path to subcategories
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
                            href={`/${category.uniqCode}`}
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
                            <MenubarContent className="bg-blue-100 dark:bg-primary-foreground/80 text-primary dark:text-primary">
                                {category.subResultCategorys.map(
                                    (subCategory) =>
                                        renderDesktopCategory(
                                            subCategory,
                                            `/${category.uniqCode}`
                                        ) // Start with parent path
                                )}
                            </MenubarContent>
                        </>
                    )}
                </MenubarMenu>
            ))}

            {/* Static Menu Items */}
            <MenubarMenu>
                <MenubarTrigger>بیشتر</MenubarTrigger>
                <MenubarContent className="bg-blue-100 dark:bg-primary-foreground/80 text-primary dark:text-primary">
                    <MenubarItem>
                        <Link
                            href="/aboutus"
                            passHref
                        >
                            <div className="cursor-pointer">
                                درباره ی ما
                            </div>
                        </Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link
                            href="/contactus"
                            passHref
                        >
                            <div className="cursor-pointer">
                                تماس با ما
                            </div>
                        </Link>
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
                <SheetContent side="right">
                    <form className="relative my-5">
                        <Input
                            type="search"
                            placeholder="جستجو..."
                            className="pl-8 pr-2 py-1 rounded-full"
                        />
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                    </form>
                    <div className="text-end flex  flex-col  gap-y-2 ">
                        <div>
                            <Link
                                className="hover:text-primary ease-out transition-colors duration-300"
                                href="/aboutus"
                                passHref
                            >
                                <div className="cursor-pointer">
                                    درباره ی ما
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link
                                className="hover:text-primary ease-out transition-colors duration-300"
                                href="/contactus"
                                passHref
                            >
                                <div className="cursor-pointer">
                                    تماس با ما
                                </div>
                            </Link>
                        </div>
                    </div>

                    <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
                        <Accordion
                            type="multiple"
                            className="w-full"
                        >
                            {categories.map(
                                (category) =>
                                    renderMobileCategory(
                                        category,
                                        ""
                                    ) // Start with empty parent path
                            )}
                        </Accordion>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    );

    return isMobile ? <MobileMenu /> : <DesktopMenu />;
}
