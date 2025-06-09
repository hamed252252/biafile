import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar } from 'lucide-react';
import { Post } from './post-card';

interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  // Conditionally set the `dir` attribute based on the language (for RTL or LTR)
  const isRtl = post?.title?.charAt(0).match(/[\u0600-\u06FF]/); // Check if the title starts with Arabic characters
  const baseUrl = 'https://api.biafile.ir/Uploadfiles/Files/';
  return (
    <Card
      dir={isRtl ? 'rtl' : 'ltr'} // Set dir attribute conditionally for RTL support
      className="flex flex-col border border-transparent hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
    >
      <div className="relative h-64 md:h-80">
        <Image
          src={`${baseUrl}${post.coverImage}`}
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
          <Link
            href={`/blog/${post.slug}`}
            className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
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
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-600 transition-all"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center text-sm text-muted-foreground text-gray-600 dark:text-gray-400 space-x-4">
          <span className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span>{post.time}</span>
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          variant="outline"
          asChild
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-600 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Link href={`/blog/${post.slug}`}>ادامه مطلب</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
