"use client";

import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Search,
    ExternalLink,
    Copy,
    Check,
    LinkIcon,
    X,
    Bookmark,
    Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface ApiGroup {
    id: number;
    title: string;
}

interface ApiLink {
    id: number;
    groupLinkID: number;
    title: string;
    url: string;
    description: string;
}

const UsefulLinks: React.FC = () => {
    const [groups, setGroups] = useState<ApiGroup[]>([]);
    const [links, setLinks] = useState<ApiLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGroupId, setSelectedGroupId] = useState<
        number | null
    >(null);
    const [copiedLinkId, setCopiedLinkId] = useState<
        number | null
    >(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const [groupRes, linkRes] =
                    await Promise.all([
                        fetch(
                            "https://api.biafile.ir/Api/GroupLinks/AllForPublicPage"
                        ),
                        fetch(
                            "https://api.biafile.ir/Api/Links/AllForPublicPage"
                        ),
                    ]);
                if (!groupRes.ok || !linkRes.ok)
                    throw new Error("Network error");

                const { entities: groupEntities } =
                    await groupRes.json();
                const { entities: linkEntities } =
                    await linkRes.json();

                setGroups(groupEntities);
                setLinks(linkEntities);
            } catch (error) {
                console.error(
                    "Failed to fetch data:",
                    error
                );
                toast({
                    title: "خطا در دریافت اطلاعات",
                    description:
                        "لطفا اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filteredLinks = useMemo(
        () =>
            links.filter((link) => {
                const searchMatch =
                    link.title
                        .toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        ) ||
                    link.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                const groupMatch =
                    selectedGroupId === null ||
                    link.groupLinkID === selectedGroupId;
                return searchMatch && groupMatch;
            }),
        [links, searchTerm, selectedGroupId]
    );

    const groupCounts = useMemo(() => {
        return links.reduce<Record<number, number>>(
            (acc, link) => {
                acc[link.groupLinkID] =
                    (acc[link.groupLinkID] || 0) + 1;
                return acc;
            },
            {}
        );
    }, [links]);

    const handleCopyLink = useCallback(
        (url: string, id: number) => {
            navigator.clipboard.writeText(url);
            setCopiedLinkId(id);
            setTimeout(() => setCopiedLinkId(null), 2000);
            toast({
                title: "لینک کپی شد",
                description: "لینک با موفقیت کپی شد.",
            });
        },
        []
    );

    return (
        <Card
            dir="rtl"
            className="max-w-4xl mx-auto my-6 shadow-xl rounded-xl overflow-hidden bg-gradient-to-br from-background to-secondary/20"
        >
            <CardHeader className="relative z-10 px-6 pt-6 pb-0">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            لینک‌های مفید
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground mt-1">
                            مجموعه‌ای از منابع کاربردی
                        </CardDescription>
                    </div>
                    <Badge
                        variant="outline"
                        className="px-3 py-1 bg-background/80 backdrop-blur-sm"
                    >
                        {loading ? (
                            <Skeleton className="h-4 w-16" />
                        ) : (
                            <span>{links.length} لینک</span>
                        )}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="relative z-10 p-6">
                {/* Search */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="relative flex-grow">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="جستجو در لینک‌ها..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }
                            className="pr-10 pl-4 bg-background/80 backdrop-blur-sm border-muted focus-visible:ring-primary"
                        />
                        {searchTerm && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7"
                                onClick={() =>
                                    setSearchTerm("")
                                }
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={() =>
                            setShowFilters((prev) => !prev)
                        }
                    >
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>

                {/* Filter Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0,
                            }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                            }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden mb-6 p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border"
                        >
                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <Bookmark className="w-4 h-4" />{" "}
                                فیلتر بر اساس دسته‌بندی
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    size="sm"
                                    variant={
                                        selectedGroupId ===
                                        null
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() =>
                                        setSelectedGroupId(
                                            null
                                        )
                                    }
                                    className="rounded-full"
                                >
                                    همه
                                    <Badge
                                        variant="secondary"
                                        className="mr-2 bg-background/50"
                                    >
                                        {links.length}
                                    </Badge>
                                </Button>
                                {loading
                                    ? Array.from({
                                          length: 5,
                                      }).map((_, i) => (
                                          <Skeleton
                                              key={i}
                                              className="h-9 w-24 rounded-full"
                                          />
                                      ))
                                    : groups.map(
                                          (group) => (
                                              <Button
                                                  key={
                                                      group.id
                                                  }
                                                  size="sm"
                                                  variant={
                                                      selectedGroupId ===
                                                      group.id
                                                          ? "default"
                                                          : "outline"
                                                  }
                                                  onClick={() =>
                                                      setSelectedGroupId(
                                                          group.id
                                                      )
                                                  }
                                                  className="rounded-full"
                                              >
                                                  {
                                                      group.title
                                                  }
                                                  <Badge
                                                      variant="secondary"
                                                      className="mr-2 bg-background/50"
                                                  >
                                                      {groupCounts[
                                                          group
                                                              .id
                                                      ] ||
                                                          0}
                                                  </Badge>
                                              </Button>
                                          )
                                      )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Links List */}
                {loading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map(
                            (_, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <Skeleton className="h-6 w-1/3" />
                                        <Skeleton className="h-5 w-20" />
                                    </div>
                                    <Skeleton className="h-4 w-full mt-2" />
                                    <Skeleton className="h-4 w-2/3 mt-1" />
                                </div>
                            )
                        )}
                    </div>
                ) : filteredLinks.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">
                            نتیجه‌ای یافت نشد
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            لطفاً با کلمات کلیدی دیگری جستجو
                            کنید یا فیلترها را تغییر دهید.
                        </p>
                        {searchTerm && (
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() =>
                                    setSearchTerm("")
                                }
                            >
                                پاک کردن جستجو
                            </Button>
                        )}
                    </div>
                ) : (
                    <ScrollArea className="h-[500px] w-full pr-4">
                        <AnimatePresence>
                            {filteredLinks.map(
                                (link, index) => (
                                    <motion.div
                                        key={link.id}
                                        layout
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -20,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            delay:
                                                index *
                                                0.05,
                                        }}
                                    >
                                        <div
                                            dir="rtl"
                                            className="group relative overflow-hidden my-2 rounded-xl border border-border bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            <a
                                                href={
                                                    link.url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block p-5 relative z-10"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                                                        <LinkIcon className="w-4 h-4 opacity-70" />{" "}
                                                        {
                                                            link.title
                                                        }
                                                    </h3>
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-secondary/50"
                                                    >
                                                        {
                                                            groups.find(
                                                                (
                                                                    g
                                                                ) =>
                                                                    g.id ===
                                                                    link.groupLinkID
                                                            )
                                                                ?.title
                                                        }
                                                    </Badge>
                                                </div>
                                                <div
                                                    className="mt-2 text-sm text-muted-foreground leading-relaxed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.description,
                                                    }}
                                                />
                                            </a>

                                            <div className="absolute bottom-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                                                    onClick={(
                                                        e
                                                    ) => {
                                                        e.preventDefault();
                                                        handleCopyLink(
                                                            link.url,
                                                            link.id
                                                        );
                                                    }}
                                                >
                                                    {copiedLinkId ===
                                                    link.id ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </AnimatePresence>
                    </ScrollArea>
                )}
            </CardContent>

            <CardFooter className="relative z-10 flex justify-between items-center text-xs text-muted-foreground p-4 border-t">
                <span>آخرین بروزرسانی: امروز</span>
                {!loading && filteredLinks.length > 0 && (
                    <span>
                        نمایش {filteredLinks.length} از{" "}
                        {links.length} لینک
                    </span>
                )}
            </CardFooter>
        </Card>
    );
};

export default UsefulLinks;
