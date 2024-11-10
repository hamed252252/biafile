import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/lib/mockData";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

export default async function PostPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <Card className="border-none shadow-none">
                <CardHeader className="space-y-6 pb-8">
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={post.date}>
                                    {post.date}
                                </time>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>
                                    {post.readingTime} min
                                    read
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div
                        className="prose prose-gray dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: post.content,
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
