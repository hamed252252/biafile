"use client";
import * as React from "react";
import { usePathname } from "next/navigation"; // اضافه کردن usePathname
import logo from "@/public/logo.svg";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { dataOfDashboardMenu } from "@/lib/constants";

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar
            dir="rtl"
            className="text-primary"
            {...props}
        >
            <SidebarHeader>
                <Link href={"/"}>
                    <div className="flex justify-start items-center">
                        <Image
                            width={45}
                            height={45}
                            alt="logo of website"
                            src={logo}
                        />
                        <h1>فرایار</h1>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dataOfDashboardMenu.personalProfile.map(
                                (item) => (
                                    <SidebarMenuItem
                                        key={item.title}
                                    >
                                        <SidebarMenuButton
                                            asChild
                                        >
                                            <a
                                                href={
                                                    item.url
                                                }
                                                className="font-medium"
                                            >
                                                {item.title}
                                            </a>
                                        </SidebarMenuButton>
                                        {item.items
                                            ?.length ? (
                                            <SidebarMenuSub className="">
                                                {item.items.map(
                                                    (
                                                        subItem
                                                    ) => (
                                                        <SidebarMenuSubItem
                                                            key={
                                                                subItem.title
                                                            }
                                                            className={`${
                                                                pathname ===
                                                                subItem.url
                                                                    ? "bg-primary/25 rounded-md"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <SidebarMenuSubButton
                                                                asChild
                                                            >
                                                                <a
                                                                    href={
                                                                        subItem.url
                                                                    }
                                                                >
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    )
                                                )}
                                            </SidebarMenuSub>
                                        ) : null}
                                    </SidebarMenuItem>
                                )
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
                <div className="flex justify-start items-center bg-primary/35 rounded-2xl p-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center items-center mr-4">
                        <div className="text-md">
                            User Name
                        </div>
                        <div className="text-sm ">
                            Email
                        </div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
