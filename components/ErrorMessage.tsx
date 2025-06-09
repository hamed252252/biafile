'use client';

import { useState, useEffect } from 'react';

export function ErrorMessage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // این بلوک فقط در کلاینت اجرا می‌شود
    const params = new URLSearchParams(window.location.search);
    setError(params.get('error'));
  }, []);

  if (!error) return null;
  return <p className="text-red-500 mb-4 text-sm">{error}</p>;
}
