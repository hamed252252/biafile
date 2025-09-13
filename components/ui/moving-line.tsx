'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, Transition, useScroll, useSpring, useTransform } from 'framer-motion';

// Define props interface for type safety
interface MovingLineProps {
  children: React.ReactNode;
}

export default function MovingLine({ children }: MovingLineProps) {
  const transition: Transition = {
    duration: 8,
    ease: [0.25, 0.1, 0.25, 1], // Custom cubic Bezier curve
  };

  const ref = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(1567); // Default height

  // Dynamically set SVG height based on content
  useEffect(() => {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      setSvgHeight(height);
    }
  }, [children]); // Recompute height if children change

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  });

  const pathLengthValue = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const PATH = `M0.5 0 L0.5 ${svgHeight}`;

  return (
    <div
      className="max-w-full mx-auto justify-center items-center flex flex-row space-x-10  w-full"
      ref={ref}
    >
      <svg
        width="1"
        height={svgHeight}
        viewBox={`0 0 1 ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="paint0_linear_207_38"
            x1="1"
            y1="-102.823"
            x2="1"
            y2={svgHeight}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3879E7" stopOpacity="0" />
            <stop offset="1" stopColor="#3879E7" />
          </linearGradient>
        </defs>
        <motion.path
          style={{
            pathLength: useSpring(pathLengthValue, {
              stiffness: 500,
              damping: 100,
            }),
          }}
          transition={transition}
          d={PATH}
          stroke="url(#paint0_linear_207_38)"
          strokeOpacity="1"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
      <div className="flex flex-col justify-center items-center w-full  max-w-6xl">{children}</div>
    </div>
  );
}
