import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { JsonPicture } from '@/app/type/edcation';

interface MediaCarouselProps {
  images: JsonPicture[];
  videos?: JsonPicture[];
}

export function MediaCarousel({ images, videos = [] }: MediaCarouselProps) {
  const hasImages = images && images.length > 0;
  const hasVideos = videos && videos.length > 0;

  if (!hasImages && !hasVideos)
    return (
      <div className="text-center text-muted-foreground mt-6">
        هیچ رسانه‌ای برای نمایش وجود ندارد.
      </div>
    );

  return (
    <Tabs
      defaultValue={hasImages ? 'images' : 'videos'}
      className="w-full"
      dir="rtl"
    >
      <TabsList className="w-full justify-center mb-4">
        {hasImages && <TabsTrigger value="images">📷 تصاویر</TabsTrigger>}
        {hasVideos && <TabsTrigger value="videos">🎥 ویدیوها</TabsTrigger>}
      </TabsList>

      {hasImages && (
        <TabsContent value="images">
          <Carousel dir="ltr" className="relative rounded-xl overflow-hidden">
            <CarouselContent>
              {images.map((img, i) => (
                <CarouselItem key={i} className="w-full">
                  <div className="relative w-full h-[300px] sm:h-[400px]">
                    <Image
                      src={`${process.env.API_UPLOADED_FILES}${img.PathFileName}`}
                      alt={img.Title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <p className="text-center mt-2 font-medium">{img.Title}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </TabsContent>
      )}

      {hasVideos && (
        <TabsContent value="videos">
          <Carousel dir="ltr" className="relative rounded-xl overflow-hidden">
            <CarouselContent>
              {videos.map((vid, i) => (
                <CarouselItem key={i} className="w-full">
                  <div className="relative w-full h-[300px] sm:h-[400px]">
                    <video
                      controls
                      className="w-full h-full object-cover rounded-xl"
                    >
                      <source
                        src={`${process.env.API_UPLOADED_FILES}${vid.PathFileName}`}
                        type="video/mp4"
                      />
                      مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                    </video>
                  </div>
                  <p className="text-center mt-2 font-medium">{vid.Title}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </TabsContent>
      )}
    </Tabs>
  );
}
