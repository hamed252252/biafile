import PostPage from '@/app/componetns/page-post';
import { ApiResponsePost } from '../page';
import MovingLine from '@/components/ui/moving-line';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const postData: ApiResponsePost = await fetch(
    'https://api.biafile.ir/Api/Posts/AllForPublicPage',
  ).then((response) => response.json());

  const postEntity = postData.entities;
  if (!postEntity || postEntity.length === 0) {
    return <p>هیچ پستی موجود نیست.</p>;
  }

  const postBySlug = postEntity.find((post) => post.id === parseInt(resolvedParams.slug));

  if (!postBySlug) {
    return <p>پست موردنظر یافت نشد.</p>;
  }

  return (
    <MovingLine>
      <PostPage
        post={{
          author: postBySlug.designer,
          content: postBySlug.longDescription,
          coverImage: postBySlug.jsonPictures,
          date: postBySlug.registerDate,
          readingTime: postBySlug.time,
          excerpt: postBySlug.shortDescription,

          title: postBySlug.title,
        }}
      />
    </MovingLine>
  );
}
