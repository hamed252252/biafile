import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/app/lib/mockData";
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
export default function Home() {
    const posts = getPosts();
    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);

    return (
        <div className="space-y-12 py-8">
            <section>
                <h2 className="text-3xl font-bold mb-6">
                    Featured Post
                </h2>
                <Card className="overflow-hidden">
                    <div className="relative h-64 md:h-80">
                        <Image
                            src={featuredPost.coverImage}
                            alt={featuredPost.title}
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
                                href={`/blog/${featuredPost.slug}`}
                                className="hover:underline"
                            >
                                {featuredPost.title}
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {featuredPost.tags.map(
                                (tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                    >
                                        {tag}
                                    </Badge>
                                )
                            )}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground space-x-4">
                            <span className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                {featuredPost.date}
                            </span>
                            <span className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {featuredPost.readingTime}{" "}
                                min read
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <Link
                                href={`/blog/${featuredPost.slug}`}
                            >
                                ادامه مطلب
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6">
                    Latest Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts.map((post) => (
                        <Card
                            key={post.slug}
                            className="flex flex-col"
                        >
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
                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map(
                                        (tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                            >
                                                {tag}
                                            </Badge>
                                        )
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                                <span className="flex items-center">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    {post.date}
                                </span>
                                <span className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4" />
                                    {post.readingTime} min
                                    read
                                </span>
                                <Button asChild>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                    >
                                        ادامه مطلب
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
