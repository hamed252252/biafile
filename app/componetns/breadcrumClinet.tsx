import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type LessonBreadcrumbClientProps = {
    degreeId: string;
    degreeTitle: string;
    gradeId: string;
    GradeTitle: string;
    subjectId: string;
    subjectTitle: string;
};
export function BreadcrumbClient({
    degreeId,
    degreeTitle,
    gradeId,
    GradeTitle,
    subjectId,
    subjectTitle,
}: LessonBreadcrumbClientProps) {
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
                    <Link
                        replace
                        prefetch={false}
                        href={`/${degreeId}`}
                    >
                        {degreeTitle}
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <Link
                        replace
                        prefetch={false}
                        href={`/${degreeId}/${gradeId}`}
                    >
                        {GradeTitle}
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <Link
                        replace
                        prefetch={false}
                        href={`/${degreeId}/${gradeId}/${subjectId}`}
                    >
                        {subjectTitle}
                    </Link>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
