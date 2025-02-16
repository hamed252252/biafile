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

export interface Post {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
    date: string;
    readingTime: string;
}

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Card className="flex flex-col">
            <div className="relative h-48">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="/fallback-image.jpg"
                />
            </div>
            <CardHeader>
                <CardTitle className="text-xl">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline"
                    >
                        {post.title}
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <div
                    suppressHydrationWarning
                    className="text-muted-foreground mb-4 line-clamp-2 "
                    dangerouslySetInnerHTML={{
                        __html: post.excerpt,
                    }}
                ></div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="outline"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {post.date}
                </span>
                <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {post.readingTime}
                </span>
                <Button asChild>
                    <Link href={`/blog/${post.slug}`}>
                        ادامه مطلب
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
