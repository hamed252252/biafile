import PostPageWrapper from "@/app/componetns/PostPageWrapper";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;

    return (
        <div>
            <PostPageWrapper params={resolvedParams} />
        </div>
    );
}
