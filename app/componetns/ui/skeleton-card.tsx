import { cn } from "@/lib/utils";

export function SkeletonCard() {
    return (
        <div
            className={cn(
                "relative flex flex-col min-h-[500px] w-full max-w-xs rounded-3xl",
                "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700",
                "shadow-lg overflow-visible transition-all animate-pulse"
            )}
        >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                <div className="h-8 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <div className="p-5 space-y-3 mt-7">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2"
                    >
                        <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 mx-5 my-2" />

            <div className="flex flex-wrap gap-2 p-4 justify-center">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="h-6 w-20 rounded-xl bg-gray-200 dark:bg-gray-700"
                    ></div>
                ))}
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 mt-auto" />

            <div className="p-4">
                <div className="w-full h-10 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
            </div>
        </div>
    );
}
