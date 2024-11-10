// components/SupportButton.tsx

import Link from "next/link";

export default function SupportButton() {
    return (
        <button>
            <a
                className="fixed bottom-10 right-4 p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all"
                aria-label="Contact Support"
            >
                📞
            </a>
        </button>
    );
}
