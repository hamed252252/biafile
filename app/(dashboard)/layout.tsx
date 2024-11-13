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
import HeaderOfDashboardPages from "../componetns/HeaderOfDashboardPages";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider dir="ltr">
            <SidebarInset>
                <HeaderOfDashboardPages />
                <main className=" ">{children}</main>
            </SidebarInset>
            <AppSidebar side="right" />
        </SidebarProvider>
    );
}
