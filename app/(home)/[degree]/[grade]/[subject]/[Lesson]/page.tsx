import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { JsonPicture, LessonHeadingEntity } from "@/app/type/edcation";
import { BreadcrumbClient } from "@/app/componetns/breadcrumClinet";
import DetailsSectionClient from "@/app/componetns/DetailsSectionClient";
import { fetchDataLessonsClassData } from "@/app/lib/fetchdataLessonsClassData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Images } from "lucide-react";

type RouteParams = {
    degree: string;
    grade: string;
    subject: string;
    Lesson: string;
};

interface CategoryEntity {
    id: number;
    title: string;
    uniqCode: string;
    slug?: string | null;
    subResultCategorys: CategoryEntity[];
}


// ✅ تابع بررسی slug یا uniqCode
const matchesSlug = (
    routeParam: string,
    entity: { slug?: string | null; uniqCode: string }
): boolean => entity.slug === routeParam || entity.uniqCode === routeParam;

export default async function WorksheetDetail({
    params,
}: {
    params: Promise<RouteParams>;
}) {
    const {
        degree,
        grade,
        subject,
        Lesson: lessonId,
    } = await params;

    const { lessons, classData } =
        await fetchDataLessonsClassData();

    const categories = classData.entities as CategoryEntity[];
    const lessonList = lessons.entities as LessonHeadingEntity[];

    // استفاده از matchesSlug
    const degreeData = categories.find((cat) =>
        matchesSlug(degree, cat)
    );
    if (!degreeData) return null;

    const gradeData = degreeData.subResultCategorys.find((gr) =>
        matchesSlug(grade, gr)
    );
    if (!gradeData) return null;

    const subjectData = gradeData.subResultCategorys.find((su) =>
        matchesSlug(subject, su)
    );
    if (!subjectData) return null;

    const lessonById = lessonList.find(
        (l) => l.id.toString() === lessonId
        
    );
    // console.log(lessonById)
// هندل کردن حالتی که jsonPictures ممکنه یا string باشه یا JsonPicture[]
let rawPictures: JsonPicture[] = []
let videoFiles: JsonPicture[] = []

if (typeof lessonById?.jsonPictures === 'string') {
  rawPictures = JSON.parse(lessonById.jsonPictures)
} else if (Array.isArray(lessonById?.jsonPictures)) {
  rawPictures = lessonById.jsonPictures
}

if (typeof lessonById?.jsonVideos === 'string') {
  videoFiles = JSON.parse(lessonById.jsonVideos)
} else if (Array.isArray(lessonById?.jsonVideos)) {
  videoFiles = lessonById.jsonVideos
}
  
if (!degreeData || !gradeData || !subjectData || !lessonById) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
            <p className="text-lg text-red-500">
                خطا: اطلاعات درس یافت نشد. لطفاً دوباره تلاش کنید.
            </p>
        </div>
    );
}
    return (
        <div className="min-h-screen bg-background" dir="rtl">
            <div className="container mx-auto px-4 mt-4">
                <BreadcrumbClient
                    degreeId={degreeData.slug || degreeData.uniqCode}
                    degreeTitle={degreeData.title}
                    gradeId={gradeData.slug || gradeData.uniqCode}
                    GradeTitle={gradeData.title}
                    subjectId={subjectData.slug || subjectData.uniqCode}
                    subjectTitle={subjectData.title}
                />

             <div   className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* پیش‌نمایش */}

<Carousel orientation="vertical" dir="ltr">
  <CarouselContent>
    {[...rawPictures.map(p => ({ ...p, type: "image" })), ...(videoFiles?.map(v => ({ ...v, type: "video" })) || [])]
      .map((item, index) => (
        <CarouselItem
          key={index}
          className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
        >
          <div className="w-full min-h-[200px] max-h-full sm:h-[250px] md:h-[300px] relative rounded-xl overflow-hidden">
            {item.type === "image" ? (
              <Image
                src={`${process.env.API_UPLOADED_FILES}${item.PathFileName}`}
                alt={item.Title}
                fill
                className="object-cover"
              />
            ) : (
              <video
                controls
                className="w-full h-full object-cover rounded-xl"
              >
                <source
                  src={`${process.env.API_UPLOADED_FILES}${item.PathFileName}`}
                  type="video/mp4"
                />
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            )}
          </div>
          <p className="mt-2 text-center text-sm font-medium">
            {item.Title}
          </p>
        </CarouselItem>
      ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>



            
                    {/* جزئیات */}
                    <div className="space-y-6">
                        <DetailsSectionClient Lesson={lessonById} />
                    </div>
                </div>
            </div>
        </div>
    );
}
