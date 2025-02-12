import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";

interface SubjectCardProps {
    title: string;
    status: string;
    tags: string[];
    description: string;
    designerAvatar: string;
    designerName: string;
    designerRole: string;
    updateDate: string;
    detailsLink: string;
}

function SubjectCard({
    title,
    status,
    tags,
    description,
    designerAvatar,
    designerName,
    designerRole,
    updateDate,
    detailsLink,
}: SubjectCardProps) {
    return (
        <Card className="w-full max-w-md transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">
                    {title}
                </CardTitle>
                <Badge variant="outline">{status}</Badge>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                        <Badge key={index}>{tag}</Badge>
                    ))}
                </div>
                <p className="text-muted-foreground mb-4">
                    توضیحات:{" "}
                    <div
                        suppressHydrationWarning
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    ></div>
                </p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar>
                        <AvatarImage src={designerAvatar} />
                        <AvatarFallback>
                            {designerName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">
                            {designerName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {designerRole}
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    <span>
                        تاریخ به روز رسانی: {updateDate}
                    </span>
                </div>
                <Link
                    href={detailsLink}
                    className="w-full sm:w-auto"
                >
                    <Button className="w-full sm:w-auto">
                        دیدن جزئیات
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default SubjectCard;
