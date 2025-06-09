'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Edit3, Save } from 'lucide-react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { CalendarIcon } from 'lucide-react';

export default function PersonalInfoForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'علی',
    lastName: 'محمدی',
    nationalId: '0123456789',
    birthDate: new Date('1991-08-06'),
    role: 'student',
    email: 'ali.mohammadi@example.com',
    phone: '09123456789',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

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
              onClick={() => setIsEditing((prev) => !prev)}
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
              {
                id: 'firstName',
                label: 'نام',
                value: personalInfo.firstName,
              },
              {
                id: 'lastName',
                label: 'نام خانوادگی',
                value: personalInfo.lastName,
              },
              {
                id: 'nationalId',
                label: 'کد ملی',
                value: personalInfo.nationalId,
              },
              {
                id: 'email',
                label: 'ایمیل (اختیاری)',
                value: personalInfo.email,
              },
              {
                id: 'phone',
                label: 'شماره تلفن (اختیاری)',
                value: personalInfo.phone,
              },
            ].map((field) => (
              <div key={field.id} className="relative w-full">
                <Label htmlFor={field.id} className="text-sm font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  value={field.value}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`
                    w-full
                    mt-1
                    bg-transparent
                    border-none
                    border-b-2
                    rounded-none
                    focus:ring-0
                    focus:border-primary
                    ${
                      isEditing
                        ? 'border-gray-400 dark:border-gray-600'
                        : 'border-gray-200 dark:border-gray-700'
                    }
                  `}
                />
              </div>
            ))}

            {/* ✅ بدون دست زدن به DatePicker همونی که کار میکرد */}
            <div className="space-y-2">
              <Label htmlFor="birthDate">تاریخ تولد (اختیاری)</Label>
              <div className="relative">
                <DatePicker
                  value={personalInfo.birthDate}
                  onChange={(date: any) => {
                    setPersonalInfo((prev) => ({
                      ...prev,
                      birthDate: date?.toDate() || null,
                    }));
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  disabled={!isEditing}
                  inputClass={`w-full border border-gray-300 rounded-md px-3  py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !personalInfo.birthDate ? 'text-gray-500 ' : ''
                  } ${!isEditing ? 'bg-gray-100 cursor-not-allowed ' : ''} 
                                 `}
                  containerClassName="w-full"
                  placeholder="انتخاب تاریخ"
                  render={(value, openCalendar) => (
                    <button
                      type="button"
                      onClick={openCalendar}
                      disabled={!isEditing}
                      className="w-full text-right flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 transition-all"
                    >
                      <span
                        className={`
                                                    
                                                  ${
                                                    !personalInfo.birthDate ? 'text-gray-500 ' : ''
                                                  } ${
                                                    !isEditing
                                                      ? ' cursor-not-allowed text-gray-500'
                                                      : ''
                                                  } `}
                      >
                        {personalInfo.birthDate
                          ? personalInfo.birthDate.toLocaleDateString('fa-IR')
                          : 'انتخاب تاریخ'}
                      </span>
                      <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                    </button>
                  )}
                />
              </div>
            </div>

            {/* نقش */}
            <div className="space-y-2">
              <Label>نقش</Label>
              <Select
                value={personalInfo.role}
                disabled={!isEditing}
                onValueChange={(value) =>
                  setPersonalInfo((prev) => ({
                    ...prev,
                    role: value,
                  }))
                }
              >
                <SelectTrigger
                  dir="rtl"
                  className="w-full border-none border-b-2 rounded-none focus:ring-0 focus:border-primary"
                >
                  <SelectValue placeholder="انتخاب نقش" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">دانش آموز /والدین</SelectItem>
                  <SelectItem value="teacher">معلم / دبیر</SelectItem>
                  <SelectItem value="admin">مدیر /معاون</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          {/* دکمه ذخیره */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-4"
              >
                <CardFooter>
                  <Button className="w-full py-3 rounded-xl shadow-md bg-primary hover:bg-primary/90 text-white">
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
