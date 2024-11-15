import { getPostBySlug } from "@/app/lib/mockData";
import PostPage from "@/app/componetns/page-post";
import { notFound } from "next/navigation";

interface PageProps {
    params: { slug: string };
}

export default function PostPageWrapper({
    params,
}: PageProps) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    return <PostPage post={post} />;
}
