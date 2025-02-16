import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";
import { Post } from "./post-card";

import "react-quill/dist/quill.snow.css";
interface FeaturedPostProps {
    post: Post;
}
export function FeaturedPost({ post }: FeaturedPostProps) {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-64 md:h-80">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="/fallback-image.jpg"
                />
            </div>
            <CardHeader>
                <CardTitle className="text-2xl">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline"
                    >
                        {post.title}
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    suppressHydrationWarning
                    className="text-muted-foreground mb-4"
                    dangerouslySetInnerHTML={{
                        __html: post.excerpt,
                    }}
                ></div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {post.date}
                    </span>
                    <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {post.readingTime}
                    </span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link href={`/blog/${post.slug}`}>
                        ادامه مطلب
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
