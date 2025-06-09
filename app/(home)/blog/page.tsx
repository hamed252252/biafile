import { FeaturedPost } from "@/app/componetns/blog/featured-post";
import { PostCard } from "@/app/componetns/blog/post-card";

// Interfaces
export interface ResultJsonLabel {
    id: string;
    text: string;
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
    designer:string|null
    registerTime: string;
    editTime: string;
    jsonLableTexts: string | null;
    resultJsonLables: ResultJsonLabel[] | null;
    time:string|null
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
    time:string|null
    longDescription: string; // افزودن longDescription
    resultJsonLables: ResultJsonLabel[]; // افزودن resultJsonLables
    jsonPictures: string; // افزودن jsonPictures
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
            <div className="text-center">
                <p className="text-red-500">خطا در دریافت پست‌ها. لطفاً دوباره تلاش کنید.</p>
            </div>
        );
    }

    const postEntity = postData.entities;
    if (!postEntity || postEntity.length === 0) {
        return (
            <div className="text-center">
                <p>هیچ پستی موجود نیست.</p>
            </div>
        );
    }

    const mappedPosts = postEntity.map(mapEntityPostToPost);
    const featuredPost = mappedPosts[0];
    const otherPosts = mappedPosts.slice(1);

    return (
        <div dir="rtl" className="space-y-12 py-8 container">
            <section>
                <h2 className="text-3xl font-bold mb-6">پست ویژه</h2>
                <FeaturedPost post={featuredPost} />
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6">آخرین پست‌ها</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts.map((post: Post) => (
                        <PostCard key={post.slug} post={post} />
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
    // تجزیه jsonPictures
    const parsedImages = entity.jsonPictures ? JSON.parse(entity.jsonPictures) : [];
    const coverImage = parsedImages.length > 0 ? parsedImages[0].PathFileName : entity.imageUIrl || "/default-image.jpg";

    // استخراج تگ‌ها از resultJsonLables
    const tags = entity.resultJsonLables ? entity.resultJsonLables.map((label) => label.text) : [];

    return {
        slug: entity.uniqCode || `${entity.id}`, // اگر uniqCode موجود نیست از id استفاده کن
        author: entity.registerDate, // می‌توان این را بر اساس نیازتان تغییر داد
        title: entity.title,
        excerpt: entity.shortDescription,
        coverImage,
        tags,
        date: formatDate(entity.registerDate), // فراخوانی تابع فرمت تاریخ
        time: entity.time, // می‌توانید زمان خواندن را به صورت داینامیک محاسبه کنید
        longDescription: entity.longDescription, // افزودن longDescription
        resultJsonLables: entity.resultJsonLables || [], // افزودن resultJsonLables
        jsonPictures: entity.jsonPictures, // افزودن jsonPictures
    };
};


// Format the date for better readability
const formatDate = (date: string): string => {
    const [day, month, year] = date.split("/"); // Assuming the date is in `1403/11/04` format
    return `${year}-${month}-${day}`; // Format to `YYYY-MM-DD`
};
