import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { CalendarIcon } from 'lucide-react';

interface SubjectCardProps {
  title: string;
  status: string;
  tags: string[];
  description: string;
  designerAvatar: string;
  designerName: string;
  designerRole: string;
  updateDate: string;
  detailsLink: string;
}

function SubjectCard({
  title,
  status,
  tags,
  description,
  designerAvatar,
  designerName,
  designerRole,
  updateDate,
  detailsLink,
}: SubjectCardProps) {
  return (
    <Card className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-4">
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        <Badge className="text-sm  border-blue-600 text-white dark:border-blue-500 ">
          {status}
        </Badge>
      </CardHeader>

      <CardContent className="px-6">
        <div className="flex flex-wrap gap-3 mb-4">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-gray-700 dark:text-gray-300 mb-6">
          توضیحات:
          <div
            className="mt-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar className="ring-2 ring-white dark:ring-gray-700">
            <AvatarImage src={designerAvatar} />
            <AvatarFallback>{designerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{designerName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{designerRole}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <CalendarIcon className="ml-1 h-4 w-4" />
          <span>تاریخ به‌روز رسانی: {updateDate}</span>
        </div>
        <Link href={detailsLink} className="w-full sm:w-auto">
          <Button className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-transform duration-150 w-full sm:w-auto">
            دیدن جزئیات
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default SubjectCard;
