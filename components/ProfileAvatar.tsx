// ProfileAvatar.tsx
'use client';

import { useUser } from '@/app/componetns/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function ProfileAvatar() {
  const { user } = useUser();

  if (!user) return <div className="text-sm opacity-60">در حال بارگذاری...</div>;

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        {user.jsonPicture ? (
          <AvatarImage src={user.jsonPicture} />
        ) : (
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{user.name}</span>
        <span className="text-xs opacity-60">{user.email}</span>
      </div>
    </div>
  );
}
