'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function StickyAdvertisement() {
  const [showAd, setShowAd] = useState(true);

  return (
    <AnimatePresence>
      {showAd && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
          className="
            fixed
            top-5 left-5
            z-50
            w-72
            bg-white/70 dark:bg-gray-800/70
            backdrop-blur-md
            border border-gray-200 dark:border-gray-700
            rounded-2xl
            shadow-xl
            p-4
            flex flex-col gap-3
          "
        >
          {/* دکمه بستن */}
          <button
            onClick={() => setShowAd(false)}
            className="absolute top-2 left-2 text-gray-500 hover:text-red-500 transition"
            aria-label="بستن تبلیغ"
          >
            <X size={18} />
          </button>

          {/* تصویر و متن */}
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <Image
              src="/ad-sample.jpg" // مسیر عکس تبلیغ
              alt="تبلیغ ویژه"
              width={60}
              height={60}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-sm text-foreground">تخفیف ویژه تا ۵۰٪</h3>
              <p className="text-xs text-muted-foreground leading-4 mt-1">
                فقط تا پایان این هفته! کلیک کنید.
              </p>
            </div>
          </a>

          {/* دکمه CTA */}
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              block
              w-full
              text-center
              bg-primary
              text-white
              py-2
              rounded-xl
              text-sm
              font-bold
              hover:bg-primary/90
              transition
            "
          >
            مشاهده تخفیف
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
