'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useUser } from './UserContext';

export default function SettingPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, imageUrl, setImageUrl, isLoading, updateUser } = useUser();

  const defaultImages = [
    'https://via.placeholder.com/100x100.png?text=Avatar+1',
    'https://via.placeholder.com/100x100.png?text=Avatar+2',
    'https://via.placeholder.com/100x100.png?text=Avatar+3',
    'https://via.placeholder.com/100x100.png?text=Avatar+4',
  ];

  if (isLoading || !user) return <div className="text-center p-6">در حال بارگذاری...</div>;

  const handleSave = async () => {
    await updateUser(user);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">تنظیمات</h1>
      </div>

      <Card dir="rtl" className="w-full max-w-2xl mx-auto">
        <CardContent dir="rtl" className="p-6">
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="account">حساب کاربری</TabsTrigger>
              <TabsTrigger value="settings">تنظیمات</TabsTrigger>
            </TabsList>

            <TabsContent dir="rtl" value="account">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">مشخصات حساب کاربری</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className={cn(
                    'outline-none border rounded-md px-4 py-2 flex items-center justify-center transition-all ease-in-out duration-300 hover:bg-primary/75',
                    isEditing && 'bg-primary text-white',
                  )}
                >
                  <Pencil className="h-4 w-4 ml-2" />
                  {isEditing ? 'ذخیره' : 'ویرایش'}
                </motion.button>
              </div>

              <div className="space-y-4">
                {['name', 'lastName', 'email', 'mobile'].map((key) => (
                  <div key={key} className="flex flex-col space-y-1.5">
                    <Label htmlFor={key}>
                      {key === 'name'
                        ? 'نام'
                        : key === 'lastName'
                          ? 'نام خانوادگی'
                          : key === 'email'
                            ? 'ایمیل'
                            : 'موبایل'}
                    </Label>
                    <Input
                      id={key}
                      value={user[key as keyof typeof user] as string}
                      readOnly={!isEditing}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent dir="rtl" value="settings">
              <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">عکس پروفایل</h2>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-32 h-32">
                      <img
                        src={imageUrl || defaultImages[0]}
                        alt="تصویر پروفایل"
                        className="w-full h-full rounded-full object-cover"
                      />
                      <Label
                        htmlFor="picture"
                        className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
                      >
                        <Camera className="h-5 w-5" />
                      </Label>
                      <input
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
