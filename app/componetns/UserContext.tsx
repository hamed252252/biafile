'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export type UserEntity = {
  id: number;
  mcode: string;
  name: string;
  lastName: string;
  gender: number;
  birthDate: string | null;
  mobile: string;
  email: string;
  jsonPicture: string | null;
  roleID: string | null;
  registerDate: string;
  editDate: string;
  uniqCode: string | null;
  registerTime: string;
  editTime: string;
  slug: string;
  jsonLableTexts: string | null;
  resultJsonLables: any;
  visible: boolean;
};

type UserContextType = {
  user: UserEntity | null;
  imageUrl: string | null;
  setImageUrl: (url: string) => void;
  isLoading: boolean;
  updateUser: (updates: Partial<UserEntity>) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = getCookie('token');

  const defaultImages = [
    'https://via.placeholder.com/100x100.png?text=Avatar+1',
    'https://via.placeholder.com/100x100.png?text=Avatar+2',
    'https://via.placeholder.com/100x100.png?text=Avatar+3',
    'https://via.placeholder.com/100x100.png?text=Avatar+4',
  ];

  const fetchUser = async () => {
    if (!token) {
      setUser({
        id: 1,
        mcode: '1234567890',
        name: 'علی',
        lastName: 'احمدی',
        gender: 1,
        birthDate: '1990-01-01',
        mobile: '09123456789',
        email: 'ali@example.com',
        jsonPicture: null,
        roleID: null,
        registerDate: '2024-01-01',
        editDate: '2024-01-01',
        uniqCode: null,
        registerTime: '10:00:00',
        editTime: '10:00:00',
        slug: 'ali-ahmadi',
        jsonLableTexts: null,
        resultJsonLables: null,
        visible: true,
      });
      setImageUrl(defaultImages[0]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('https://api.biafile.ir/api/Customers/GetInfo/Public', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch user info');
      const data = await res.json();
      setUser(data.entity);
      setImageUrl(data.entity.jsonPicture || defaultImages[0]);
    } catch (err) {
      console.error('❌ Fetch user error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<UserEntity>) => {
    if (!user) return;
    try {
      if (!token) {
        setUser({ ...user, ...updates });
        toast({
          title: '✅ تغییرات ذخیره شد',
          description: 'اطلاعات شما با موفقیت بروزرسانی شد.',
          duration: 3000,
        });
        return;
      }

      const res = await fetch('https://api.biafile.ir/api/Customers/UpdateInfo/Public', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...user, ...updates, jsonPicture: imageUrl }),
      });
      if (!res.ok) throw new Error('Failed to update user');
      const data = await res.json();
      setUser(data.entity);
      toast({
        title: '✅ تغییرات ذخیره شد',
        description: 'اطلاعات شما با موفقیت بروزرسانی شد.',
        duration: 3000,
      });
    } catch (err) {
      console.error('❌ Update user error:', err);
      toast({ title: '❌ خطا در ذخیره تغییرات', variant: 'destructive' });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, imageUrl, setImageUrl, isLoading, updateUser, refreshUser: fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
