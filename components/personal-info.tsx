'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit3, Save, CalendarIcon } from 'lucide-react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Cookies from 'js-cookie';
import { useUser } from '@/app/componetns/UserContext';

export default function PersonalInfoForm() {
  const { user, isLoading, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // فرم با state محلی
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    mcode: '',
    birthDate: null as Date | null,
    email: '',
    mobile: '',
  });

  // مقداردهی اولیه فرم
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastName: user.lastName || '',
        mcode: user.mcode || '',
        birthDate: user.birthDate ? new Date(user.birthDate) : null,
        email: user.email || '',
        mobile: user.mobile || '',
      });
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (key: keyof typeof formData, value: string | Date | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      await updateUser({
        name: formData.name,
        lastName: formData.lastName,
        mcode: formData.mcode,
        birthDate: formData.birthDate ? formData.birthDate.toISOString().split('T')[0] : null,
        email: formData.email,
        mobile: formData.mobile,
      });
      setIsEditing(false);
    } catch (err) {
      console.error('❌ خطا در ذخیره اطلاعات:', err);
      alert('❌ خطا در ذخیره اطلاعات');
    }
  };

  if (loading || isLoading) return <div className="text-center py-6">در حال بارگذاری...</div>;

  return (
    <div dir="rtl" className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 rounded-3xl p-4">
          <CardHeader className="flex justify-between items-center pb-4 border-b">
            <CardTitle className="text-lg font-bold">اطلاعات شخصی</CardTitle>
            <motion.button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-primary hover:text-white bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg transition-all"
            >
              {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
              {isEditing ? 'ذخیره' : 'ویرایش'}
            </motion.button>
          </CardHeader>

          <CardContent className="space-y-6 mt-4">
            {[
              { id: 'name', label: 'نام', value: formData.name },
              { id: 'lastName', label: 'نام خانوادگی', value: formData.lastName },
              { id: 'mcode', label: 'کد ملی', value: formData.mcode },
              { id: 'email', label: 'ایمیل', value: formData.email },
              { id: 'mobile', label: 'شماره تلفن', value: formData.mobile },
            ].map((field) => (
              <div key={field.id} className="relative w-full">
                <Label htmlFor={field.id} className="text-sm font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  value={field.value}
                  onChange={(e) =>
                    handleInputChange(field.id as keyof typeof formData, e.target.value)
                  }
                  disabled={!isEditing}
                  className={`w-full mt-1 bg-transparent border-none border-b-2 rounded-none focus:ring-0 focus:border-primary ${
                    isEditing
                      ? 'border-gray-400 dark:border-gray-600'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                />
              </div>
            ))}

            {/* تاریخ تولد */}
            <div className="space-y-2">
              <Label htmlFor="birthDate">تاریخ تولد</Label>
              <DatePicker
                value={formData.birthDate}
                onChange={(date: any) => handleInputChange('birthDate', date?.toDate() || null)}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                disabled={!isEditing}
                inputClass={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !formData.birthDate ? 'text-gray-500' : ''
                } ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder="انتخاب تاریخ"
                render={(value, openCalendar) => (
                  <button
                    type="button"
                    onClick={openCalendar}
                    disabled={!isEditing}
                    className="w-full text-right flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 transition-all"
                  >
                    <span
                      className={`${!formData.birthDate ? 'text-gray-500' : ''} ${
                        !isEditing ? 'cursor-not-allowed text-gray-500' : ''
                      }`}
                    >
                      {formData.birthDate
                        ? formData.birthDate.toLocaleDateString('fa-IR')
                        : 'انتخاب تاریخ'}
                    </span>
                    <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  </button>
                )}
              />
            </div>
          </CardContent>

          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-4"
              >
                <CardFooter>
                  <Button
                    className="w-full py-3 rounded-xl shadow-md bg-primary hover:bg-primary/90 text-white"
                    onClick={handleSave}
                  >
                    ذخیره تغییرات
                  </Button>
                </CardFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}
