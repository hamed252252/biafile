import { FeaturedPost } from "@/app/componetns/blog/featured-post";
import { PostCard } from "@/app/componetns/blog/post-card";

// Interfaces
export interface ResultJsonLabel {
    id: string;
    text: string;
}

export interface JsonPicture {
    Title: string;
    PathFileName: string;
}

interface EntityPost {
    id: number;
    categoryPostID: number;
    title: string;
    shortDescription: string;
    longDescription: string;
    jsonPictures: string; // Stringified JSON array of JsonPicture
    jsonFiles: string | null;
    jsonVideos: string | null;
    visible: boolean;
    imageUIrl: string | null;
    registerDate: string;
    editDate: string;
    uniqCode: string | null;
    registerTime: string;
    editTime: string;
    jsonLableTexts: string | null;
    resultJsonLables: ResultJsonLabel[] | null;
}

export interface ApiResponsePost {
    status: string;
    statusCode: number;
    message: string;
    entities: EntityPost[];
    countAllRecordTable: number;
}

export interface Post {
    slug: string;
    author?: string;
    title: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
    date: string;
    readingTime: string;
}

// Home Component
const Home = async (): Promise<JSX.Element> => {
    let postData: ApiResponsePost;

    try {
        const response = await fetch(
            "https://api.biafile.ir/Api/Posts/AllForPublicPage"
        );
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        postData = await response.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        return (
            <div>
                <p>
                    خطا در دریافت پست‌ها. لطفاً دوباره تلاش
                    کنید.
                </p>
            </div>
        );
    }

    const postEntity = postData.entities;
    if (!postEntity || postEntity.length === 0) {
        return (
            <div>
                <p>هیچ پستی موجود نیست.</p>
            </div>
        );
    }

    const mappedPosts = postEntity.map(mapEntityPostToPost);
    const featuredPost = mappedPosts[0];
    const otherPosts = mappedPosts.slice(1);

    return (
        <div className="space-y-12 py-8 container">
            <section>
                <h2 className="text-3xl font-bold mb-6">
                    پست ویژه
                </h2>
                <FeaturedPost post={featuredPost} />
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6">
                    آخرین پست‌ها
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts.map((post: Post) => (
                        <PostCard
                            key={post.slug}
                            post={post}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

// Explicit export for Next.js page
export default Home;

// Define mapEntityPostToPost function
const mapEntityPostToPost = (entity: EntityPost): Post => {
    return {
        slug: entity.uniqCode || `${entity.id}`, // assuming `uniqCode` is your slug
        author: entity.registerDate, // You can adjust this based on your requirements
        title: entity.title,
        excerpt: entity.shortDescription,
        coverImage:
            entity.imageUIrl &&
            entity.imageUIrl.trim() !== ""
                ? entity.imageUIrl
                : "/default-image.jpg", // مقدار پیش‌فرض برای تصویر
        tags: [], // Add logic to map tags if needed
        date: entity.registerDate,
        readingTime: "5 min", // You can calculate or fetch reading time if necessary
    };
};
