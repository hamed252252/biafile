import * as React from "react";
import logo from "@/public/logo.svg";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
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

// این داده نمونه است.
const data = {
    personalProfile: [
        {
            title: "مشخصات فردی",
            url: "#",
            items: [
                {
                    title: "مشخصات فردی",
                    url: "/personalprofile",
                },
            ],
        },
        {
            title: "کیف پول",
            url: "#",
            items: [
                {
                    title: "اعتبار اصلی",
                    url: "#",
                },
                {
                    title: "شگفت انگیز",
                    url: "#",
                },
                {
                    title: "تاریخچه ی شارژ",
                    url: "#",
                },
            ],
        },
        {
            title: "تاریخچه ی تراکنش ها",
            url: "#",
            items: [
                {
                    title: "دانلود تراکنش ها",
                    url: "#",
                },
                {
                    title: "تاریخ پرداخت",
                    url: "#",
                },
            ],
        },
    ],
};

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar
            dir="rtl"
            className="text-primary"
            {...props}
        >
            <SidebarHeader>
                <div className="flex justify-start items-center">
                    <Image
                        width={45}
                        height={45}
                        alt="logo of websit"
                        src={logo}
                    />
                    <h1>فرایار</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.personalProfile.map(
                                (item) => (
                                    <SidebarMenuItem
                                        className=""
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
                                            <SidebarMenuSub className=" ">
                                                {item.items.map(
                                                    (
                                                        subItem
                                                    ) => (
                                                        <SidebarMenuSubItem
                                                            key={
                                                                subItem.title
                                                            }
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
                            useName
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
