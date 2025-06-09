'use client';
import * as React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import logo from '@/public/logo.svg';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { dataOfDashboardMenu } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title],
    );
  };

  return (
    <Sidebar
      dir="rtl"
      className="text-[hsl(var(--sidebar-foreground))] bg-[hsl(var(--sidebar-background))] border-l border-[hsl(var(--sidebar-border))]"
      {...props}
    >
      {/* --- Header with Logo --- */}
      <SidebarHeader className="border-b border-[hsl(var(--sidebar-border))] p-4">
        <Link href={'/'}>
          <div className="flex justify-start items-center gap-2">
            <Image width={35} height={35} alt="لوگو سایت" src={logo} />
            <h1 className="font-semibold text-lg">بیا فایل</h1>
          </div>
        </Link>
      </SidebarHeader>

      {/* --- Main Menu --- */}
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataOfDashboardMenu.personalProfile.map((item) => {
                const Icon = item.icon;
                const isOpen = openMenus.includes(item.title);

                return (
                  <SidebarMenuItem key={item.title} className="mb-1">
                    {/* Main Item */}
                    <div
                      onClick={() => toggleMenu(item.title)}
                      className={`flex items-center justify-between cursor-pointer gap-3 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        pathname === item.url
                          ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]'
                          : 'hover:bg-[hsl(var(--sidebar-accent))]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 flex items-center justify-center bg-[hsl(var(--sidebar-accent))]/60 rounded-lg shadow-inner transition-all group-hover:scale-110">
                          <Icon
                            size={16}
                            className="text-[hsl(var(--sidebar-accent-foreground))] transition-all"
                          />
                        </div>
                        {item.title}
                      </div>

                      {item.items?.length ? (
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      ) : null}
                    </div>

                    {/* Sub Items */}
                    {item.items?.length && (
                      <ul
                        className={`pl-6 pr-3 mt-1 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        {item.items.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <li
                              key={subItem.title}
                              className={`${
                                pathname === subItem.url
                                  ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]'
                                  : 'hover:bg-[hsl(var(--sidebar-accent))]/40'
                              } rounded-lg`}
                            >
                              <SidebarMenuButton asChild>
                                <Link
                                  href={subItem.url}
                                  className="flex items-center gap-3 py-2 px-3 text-sm transition-all"
                                >
                                  <SubIcon size={14} className="opacity-70" />
                                  {subItem.title}
                                </Link>
                              </SidebarMenuButton>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* --- Sidebar Rail --- */}
      <SidebarRail />

      {/* --- Footer --- */}
      <SidebarFooter className="border-t border-[hsl(var(--sidebar-border))] p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">User Name</span>
            <span className="text-xs opacity-60">email@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
