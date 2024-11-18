"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { usePathname } from "next/navigation"; // اضافه کردن usePathname
import { dataOfDashboardMenu } from "@/lib/constants";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

// داده‌های سایدبار به صورت prop به کامپوننت ارسال می‌شوند
function HeaderOfDashboardPages() {
    const pathname = usePathname(); // دریافت pathname

    // پیدا کردن آیتم اصلی و زیرآیتم فعال بر اساس pathname
    const activeItem =
        dataOfDashboardMenu.personalProfile.find((item) =>
            pathname.startsWith(item.url)
        );
    const activeSubItem =
        activeItem?.items?.find(
            (subItem) => pathname === subItem.url
        ) || null;

    return (
        <div>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        {/* آیتم اصلی نان‌بر */}
                        {activeItem && (
                            <>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink
                                        href={
                                            activeItem.url
                                        }
                                    >
                                        {activeItem.title}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                            </>
                        )}
                        {/* زیرآیتم نان‌بر */}
                        {activeSubItem && (
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {activeSubItem.title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>

                <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
            </header>
        </div>
    );
}

export default HeaderOfDashboardPages;
