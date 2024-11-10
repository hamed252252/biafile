// components/PostCard.tsx

import React from "react";
import Link from "next/link";

interface PostCardProps {
    title: string;
    description: string;
    slug: string;
}

const PostCard: React.FC<PostCardProps> = ({
    title,
    description,
    slug,
}) => {
    return (
        <div className="border border-gray-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">
                {title}
            </h2>
            <p className="text-gray-600">{description}</p>
            <Link
                className="text-blue-500 mt-4 inline-block hover:underline"
                href={`/blog/${slug}`}
            >
                Read more
            </Link>
        </div>
    );
};

export default PostCard;
