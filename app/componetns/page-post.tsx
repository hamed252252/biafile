'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Calendar, Clock, User, Share2, Flag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  motion,
  AnimatePresence,
  Transition,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

// MovingLine Component (from previous messages)
interface MovingLineProps {
  children: React.ReactNode;
}

function MovingLine({ children }: MovingLineProps) {
  const transition: Transition = {
    duration: 14,
    ease: [0.25, 0.1, 0.25, 1],
  };

  const ref = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(1567);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setSvgHeight(ref.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  });

  const pathLengthValue = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const PATH = `M0.5 0 L0.5 ${svgHeight}`;

  return (
    <div className="max-w-4xl mx-auto flex flex-row space-x-10 items-start w-full" ref={ref}>
      <svg
        width="1"
        height={svgHeight}
        viewBox={`0 0 1 ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="paint0_linear_207_38"
            x1="1"
            y1="-102.823"
            x2="1"
            y2={svgHeight}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3879E7" stopOpacity="0" />
            <stop offset="1" stopColor="#3879E7" />
          </linearGradient>
        </defs>
        <motion.path
          style={{
            pathLength: useSpring(pathLengthValue, {
              stiffness: 500,
              damping: 100,
            }),
          }}
          transition={transition}
          d={PATH}
          stroke="url(#paint0_linear_207_38)"
          strokeOpacity="1"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
}

// PostPage Types and Components
interface Post {
  title: string;
  author: string | null;
  date: string;
  readingTime?: string | null;
  coverImage: string;
  content: string;
  excerpt: string;
}

interface PostPageProps {
  post: Post;
}

interface Heading {
  id: string;
  text: string | null;
  level: number;
}

const extractHeadings = (htmlContent: string): { headings: Heading[]; updatedContent: string } => {
  // Return fallback if not in browser environment
  if (typeof window === 'undefined') {
    return { headings: [], updatedContent: htmlContent };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const headings = Array.from(doc.querySelectorAll('h2, h3')).map((heading) => {
    const id = heading.textContent?.replace(/\s+/g, '-').toLowerCase() || '';
    heading.id = id;
    return {
      id,
      text: heading.textContent,
      level: parseInt(heading.tagName.substring(1)),
    };
  });

  return { headings, updatedContent: doc.body.innerHTML };
};

const baseImageURl = 'https://api.biafile.ir/Uploadfiles/Files/';

function PostHeader({ post }: { post: Post }) {
  let imagePath = '/default-image.jpg';
  try {
    const jsonPictures = post.coverImage ? JSON.parse(post.coverImage) : [];
    imagePath = jsonPictures.length > 0 ? jsonPictures[0].PathFileName : '/default-image.jpg';
  } catch (error) {
    console.error('Error parsing coverImage:', error);
  }

  return (
    <div dir="rtl" className="mb-6 space-y-4">
      <div className="relative h-64 rounded-lg overflow-hidden">
        <Image
          src={`${baseImageURl}${imagePath}`}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{post.date}</time>
        </div>
        {post.readingTime && (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TableOfContents({
  headings,
  activeHeading,
  scrollToSection,
  isMenuOpen,
  setIsMenuOpen,
}: {
  headings: Heading[];
  activeHeading: string;
  scrollToSection: (id: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}) {
  return (
    <aside
      dir="rtl"
      className="lg:sticky lg:left-0 lg:top-20 bg-muted rounded-lg shadow-lg p-4 mb-6 lg:mb-0"
    >
      <div className="flex justify-between items-center lg:hidden">
        <h2 className="text-lg font-semibold">در این صفحه</h2>
        <Button
          variant="ghost"
          size="icon"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 lg:hidden"
          >
            <TableOfContentsList
              headings={headings}
              activeHeading={activeHeading}
              scrollToSection={scrollToSection}
              setIsMenuOpen={setIsMenuOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden lg:block">
        <TableOfContentsList
          headings={headings}
          activeHeading={activeHeading}
          scrollToSection={scrollToSection}
        />
      </div>
    </aside>
  );
}

function TableOfContentsList({
  headings,
  activeHeading,
  scrollToSection,
  setIsMenuOpen,
}: {
  headings: Heading[];
  activeHeading: string;
  scrollToSection: (id: string) => void;
  setIsMenuOpen?: (isOpen: boolean) => void;
}) {
  return (
    <nav className="" aria-label="Table of contents">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className="text-right">
            <Button
              onClick={() => {
                scrollToSection(heading.id);
                setIsMenuOpen?.(false);
              }}
              variant="ghost"
              className={cn(
                'text-sm justify-start w-full',
                activeHeading === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground',
                heading.level === 3 && 'pr-4',
              )}
            >
              {heading.text}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function PostActions({
  handleShare,
  handleReportError,
}: {
  handleShare: () => void;
  handleReportError: () => void;
}) {
  return (
    <div dir="rtl" className="flex gap-4 mb-6">
      <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        اشتراک‌گذاری
      </Button>
      <Button onClick={handleReportError} variant="outline" className="flex items-center gap-2">
        <Flag className="h-4 w-4" />
        گزارش خطا
      </Button>
    </div>
  );
}

function PostContent({ updatedContent }: { updatedContent: string }) {
  return (
    <motion.div
      dir="rtl"
      className="prose prose-blue dark:prose-invert max-w-none mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      dangerouslySetInnerHTML={{ __html: updatedContent || '' }}
    />
  );
}

export default function PostPage({ post }: PostPageProps) {
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [contentData, setContentData] = useState<{
    headings: Heading[];
    updatedContent: string;
  }>({ headings: [], updatedContent: post.content || '' });

  useEffect(() => {
    const { headings, updatedContent } = extractHeadings(post.content || '');
    setContentData({ headings, updatedContent });
  }, [post.content]);

  useEffect(() => {
    if (contentData.headings.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    contentData.headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      contentData.headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [contentData.headings]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setIsMenuOpen(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
        toast({
          title: 'اشتراک‌گذاری موفق',
          description: 'محتوا با موفقیت به اشتراک گذاشته شد.',
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
          title: 'خطا در اشتراک‌گذاری',
          description: 'متأسفانه مشکلی در اشتراک‌گذاری پیش آمد.',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'اشتراک‌گذاری',
        description: 'لطفاً لینک صفحه را کپی و به اشتراک بگذارید.',
      });
    }
  };

  const handleReportError = () => {
    toast({
      title: 'گزارش خطا',
      description: 'از گزارش شما متشکریم. تیم ما به زودی آن را بررسی خواهد کرد.',
    });
  };

  return (
    <div dir="ltr" className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Table of Contents */}
        <div className="lg:col-span-3 lg:order-1 lg:!text-left">
          <TableOfContents
            headings={contentData.headings}
            activeHeading={activeHeading}
            scrollToSection={scrollToSection}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        {/* Main Content with MovingLine */}
        <div className="lg:col-span-9 lg:order-2 bg-background rounded-lg shadow-lg p-6">
          <MovingLine>
            <PostHeader post={post} />
            <PostActions handleShare={handleShare} handleReportError={handleReportError} />
            <PostContent updatedContent={contentData.updatedContent} />
          </MovingLine>
        </div>
      </div>
    </div>
  );
}
