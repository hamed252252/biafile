import PostPage from "@/app/componetns/page-post";
import { ApiResponsePost } from "../page";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const postData: ApiResponsePost = await fetch(
        "https://api.biafile.ir/Api/Posts/AllForPublicPage"
    ).then((response) => response.json());

    const postEntity = postData.entities;
    if (!postEntity || postEntity.length === 0) {
        return <p>هیچ پستی موجود نیست.</p>;
    }

    const postBySlug = postEntity.find(
        (post) => post.id === parseInt(resolvedParams.slug)
    );
    console.log("post byslug");
    console.log(postBySlug);
    if (!postBySlug) {
        return <p>پست موردنظر یافت نشد.</p>;
    }

    return (
        <div>
            <PostPage
                post={{
                    author: "نویسینده",
                    content: postBySlug.longDescription,
                    coverImage: postBySlug.imageUIrl
                        ? postBySlug.imageUIrl
                        : "/",
                    date: postBySlug.registerDate,
                    readingTime: 10,
                    excerpt: postBySlug.shortDescription,

                    title: postBySlug.title,
                }}
            />
        </div>
    );
}
