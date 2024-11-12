import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider dir="ltr">
            <SidebarInset>
                <main className=" ">{children}</main>
            </SidebarInset>
            <AppSidebar side="right" />
        </SidebarProvider>
    );
}
