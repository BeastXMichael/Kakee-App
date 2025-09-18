
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { intelligentWatchTabSearch, IntelligentWatchTabSearchOutput } from "@/ai/flows/intelligent-watch-tab-search";

type SearchOverlayProps = {
    show: boolean;
    onClose: () => void;
};

const genres = [
    { name: "Lofi Beats", gradient: "from-blue-500 to-cyan-500" },
    { name: "K-Pop", gradient: "from-pink-500 to-purple-500" },
    { name: "Workout", gradient: "from-yellow-500 to-orange-500" },
    { name: "Mandopop", gradient: "from-red-500 to-rose-500" },
]

export default function ListenSearchOverlay({ show, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<IntelligentWatchTabSearchOutput | null>(null);

    const handleSearch = async (searchQuery?: string) => {
        const currentQuery = searchQuery || query;
        if (!currentQuery) return;

        setIsLoading(true);
        setResults(null);
        try {
            const res = await intelligentWatchTabSearch({ query: currentQuery, genrePreferences: ['music'] });
            setResults(res);
        } catch (error) {
            console.error("Error fetching search results:", error);
            // Optionally, set an error state to show in the UI
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGenreClick = (genreName: string) => {
        setQuery(genreName);
        handleSearch(genreName);
    }

    return (
        <div className={`absolute inset-0 z-30 bg-black/80 backdrop-blur-md p-4 flex flex-col transition-opacity duration-300 ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <header className="flex-shrink-0 flex items-center justify-between gap-2">
                <Input
                    type="text"
                    placeholder="Search artists, songs, playlists..."
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
                
                {results && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="font-bold text-lg text-white mb-3">Content Suggestions</h2>
                            <div className="space-y-2">
                                {results.suggestedContent.map((item, i) => (
                                    <Card key={`content-${i}`} className="bg-white/10 border-white/20 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                        <CardContent className="p-3">
                                            <p className="text-white">{item}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-white mb-3">Genre Suggestions</h2>
                             <div className="flex flex-wrap gap-2">
                                {results.suggestedGenres.map((item, i) => (
                                    <button key={`genre-${i}`} onClick={() => handleGenreClick(item)} className="bg-primary/80 text-primary-foreground rounded-full px-3 py-1 text-sm font-semibold transition-transform duration-200 hover:scale-110 cursor-pointer">{item}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    <h2 className="font-bold text-lg text-white mb-3">Browse Genres</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {genres.map(genre => (
                            <button key={genre.name} onClick={() => handleGenreClick(genre.name)} className={`aspect-video rounded-lg bg-gradient-to-br ${genre.gradient} flex items-center justify-center p-2 font-bold text-white text-shadow transition-transform duration-200 hover:scale-105 cursor-pointer`}>
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
