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
    longDescription: string;
    time:string|null
    resultJsonLables: { id: string; text: string }[];
    jsonPictures: string; // JSON string
}

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    // Parsing jsonPictures
    const parsedImages = post.jsonPictures ? JSON.parse(post.jsonPictures) : [];
    const coverImage = parsedImages.length > 0 ? parsedImages[0].PathFileName : "/fallback-image.jpg";
const baseURl="https://api.biafile.ir/Uploadfiles/Files/"
    return (
        <Card className="flex flex-col border border-transparent hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
            <div className="relative h-48 md:h-64">
                <Image
                    src={`${baseURl}${coverImage}`}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="/fallback-image.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 rounded-t-lg"></div>
            </div>
            <CardHeader className="p-4 space-y-2">
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                    <Link href={`/blog/${post.slug}`} className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 ease-in-out">
                        {post.title}
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex-grow">
                <div
                    suppressHydrationWarning
                    className="text-muted-foreground mb-4 text-gray-700 dark:text-gray-300 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                ></div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {post.resultJsonLables.map((label) => (
                        <Badge key={label.id} variant="outline" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-600 transition-all">
                            {label.text}
                        </Badge>
                    ))}
                </div>

                <div
                    suppressHydrationWarning
                    className="text-muted-foreground mb-4 text-gray-700 dark:text-gray-300 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.longDescription }}
                ></div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>{post.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>{post.time}</span>
                </span>
                <Button variant="outline" asChild className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-600">
                    <Link href={`/blog/${post.slug}`}>ادامه مطلب</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
