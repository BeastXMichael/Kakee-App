'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { intelligentWatchTabSearch } from "@/ai/flows/intelligent-watch-tab-search";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

type SearchOverlayProps = {
    show: boolean;
    onClose: () => void;
};

const genres = [
    { name: "Weekend Watch", gradient: "from-red-500 to-orange-500" },
    { name: "Romance", gradient: "from-purple-500 to-pink-500" },
    { name: "Comedy", gradient: "from-green-500 to-lime-500" },
    { name: "Thriller", gradient: "from-gray-700 to-gray-900" },
]

export default function SearchOverlay({ show, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<{ suggestedContent: string[], suggestedGenres: string[] } | null>(null);

    const handleSearch = async () => {
        if (!query) return;
        setIsLoading(true);
        setResults(null);
        try {
            const searchResults = await intelligentWatchTabSearch({ query });
            setResults(searchResults);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`absolute inset-0 z-30 bg-black/80 backdrop-blur-md p-4 flex flex-col transition-opacity duration-300 ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <header className="flex-shrink-0 flex items-center justify-between gap-2">
                <Input
                    type="text"
                    placeholder="Search dramas, genres..."
                    className="bg-white/10 text-white rounded-full py-2 px-4 placeholder-gray-400 border-white/20 focus-visible:ring-primary"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button variant="ghost" onClick={onClose} className="text-gray-300 hover:text-white shrink-0">Cancel</Button>
            </header>

            <div className="mt-6 flex-grow overflow-y-auto no-scrollbar">
                {isLoading && (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                )}
                {results ? (
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-bold text-lg text-white mb-3">Suggested Content</h2>
                            <div className="space-y-2">
                                {results.suggestedContent.map((item, i) => (
                                    <Card key={i} className="bg-white/10 border-white/20">
                                        <CardContent className="p-3">
                                            <p className="text-white">{item}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-white mb-3">Suggested Genres</h2>
                             <div className="flex flex-wrap gap-2">
                                {results.suggestedGenres.map((item, i) => (
                                    <div key={i} className="bg-primary/80 text-primary-foreground rounded-full px-3 py-1 text-sm font-semibold">{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : !isLoading && (
                    <>
                        <h2 className="font-bold text-lg text-white mb-3">Browse Genres</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {genres.map(genre => (
                                <div key={genre.name} className={`aspect-video rounded-lg bg-gradient-to-br ${genre.gradient} flex items-center justify-center p-2 font-bold text-white text-shadow`}>
                                    {genre.name}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
