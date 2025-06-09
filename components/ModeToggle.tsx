'use client';

import * as React from 'react';
import { Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div suppressHydrationWarning>
      <Button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        variant="link"
        size="icon"
        className="relative w-10 h-10 rounded-full "
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{ y: 20, opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
          >
            {theme === 'light' && <Sun className={cn('h-4 w-4', 'stroke-white')} />}
            {theme === 'dark' && <Moon className={cn('h-4 w-4', 'stroke-white ')} />}
            {theme === 'system' && <Laptop className={cn('h-4 w-4', 'stroke-white')} />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </div>
  );
}
