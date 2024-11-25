"use client";

import { useRouter } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbClient() {
    const router = useRouter();

    return (
        <Breadcrumb className="mb-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className="hover:text-primary/75 hover:cursor-pointer"
                        href="/"
                    >
                        صفحه اصلی
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className="hover:text-primary/75 hover:cursor-pointer"
                        href="#"
                        onClick={(event) => {
                            event.preventDefault();
                            window.history.go(-2);
                        }}
                    >
                        کاربرگ‌ها
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className="hover:text-primary/75 hover:cursor-pointer"
                        href="#"
                        onClick={(event) => {
                            event.preventDefault();
                            router.back();
                        }}
                    >
                        فارسی
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
