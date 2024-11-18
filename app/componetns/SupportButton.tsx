// components/SupportButton.tsx
import { BiSupport } from "react-icons/bi";
import Link from "next/link";

export default function SupportButton() {
    return (
        <button>
            <BiSupport className="size-10  fixed bottom-10 right-4 p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-all" />
        </button>
    );
}
