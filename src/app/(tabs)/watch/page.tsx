import WatchClient from "./watch-client";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { VideoContent } from "./watch-client";

const topVideos: VideoContent[] = [
    { id: 'new-drama-1', title: 'My Secret Kopi Stall Romance', playlistId: 'new-drama-1', imageId: 'new-drama-1' },
    { id: 'new-drama-2', title: "Ah Beng's Guide to the Galaxy", playlistId: 'new-drama-2', imageId: 'new-drama-2' },
    { id: 'new-drama-3', title: 'The Last Mama Shop', playlistId: 'new-drama-3', imageId: 'new-drama-3' },
    { id: 'recently-watched', title: 'From HDB to CEO', playlistId: 'recently-watched', imageId: 'recently-watched' },
    { id: 'short-1', title: 'Singapore Street Food', playlistId: 'short-1', imageId: 'short-1' },
    { id: 'short-2', title: 'Gardens by the Bay Lights', playlistId: 'short-2', imageId: 'short-2' },
    { id: 'short-3', title: 'Merlion Park Moments', playlistId: 'short-3', imageId: 'short-3' },
    { id: 'short-4', title: 'Funny Cat Moments', playlistId: 'short-4', imageId: 'short-4' },
];

const trendingDramas: VideoContent[] = [
    { id: 'trending-1', title: 'Top Hits', playlistId: 'trending-1', imageId: 'trending-1' },
    { id: 'trending-2', title: 'Viral 50', playlistId: 'trending-2', imageId: 'trending-2' },
    { id: 'trending-3', title: 'Global Hits', playlistId: 'trending-3', imageId: 'trending-3' },
];

const forYou: VideoContent[] = [
    { id: 'made-for-you-1', title: 'For You Mix', playlistId: 'made-for-you-1', imageId: 'made-for-you-1' },
    { id: 'made-for-you-2', title: 'Lofi Beats', playlistId: 'made-for-you-2', imageId: 'made-for-you-2' },
    { id: 'made-for-you-3', title: 'Discovery', playlistId: 'made-for-you-3', imageId: 'made-for-you-3' },
];

const moreToWatch: VideoContent[] = [
    { id: 'drops-1', title: 'Ah Beng\'s Guide', playlistId: 'drops-1', imageId: 'drops-1', description: 'Your essential guide to everything.' },
    { id: 'drops-2', title: 'New Lobang!', playlistId: 'drops-2', imageId: 'drops-2', description: 'The latest deals and steals.' },
    { id: 'drops-3', title: 'New Game!', playlistId: 'drops-3', imageId: 'drops-3', description: 'Challenge yourself with new games.' },
    { id: 'recently-1', title: 'Lofi Beats Radio', playlistId: 'radio-1', imageId: 'radio-1', description: 'Chill beats to relax to.' },
    { id: 'short-5', title: 'Dance Challenge', playlistId: 'short-5', imageId: 'short-5', description: 'Show off your moves.' },
    { id: 'short-6', title: 'Art & Craft DIY', playlistId: 'short-6', imageId: 'short-6', description: 'Get creative at home.' },
];

export default function WatchPage() {
    return <WatchClient topVideos={topVideos} trendingDramas={trendingDramas} forYou={forYou} moreToWatch={moreToWatch} />;
}