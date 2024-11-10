"use client";
import { Button } from "@/components/ui/button";
// components/ScrollToTopButton.tsx

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () =>
            window.removeEventListener(
                "scroll",
                toggleVisibility
            );
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Button
            onClick={scrollToTop}
            className={`fixed bottom-10 left-4 p-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-opacity ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Scroll to top"
        >
            ↑
        </Button>
    );
}
