
import WatchClient from "./watch-client";

const topVideos = [
    { id: 'new-drama-1', title: 'My Secret Kopi Stall Romance' },
    { id: 'new-drama-2', title: "Ah Beng's Guide to the Galaxy" },
    { id: 'new-drama-3', title: 'The Last Mama Shop' },
    { id: 'drops-1', title: 'Ah Beng\'s Guide' },
    { id: 'drops-2', title: 'New Lobang!' },
    { id: 'drops-3', title: 'New Game!' },
    { id: 'recently-1', title: 'Lofi Beats Radio' },
    { id: 'made-for-you-1', title: 'For You Mix' },
];

const trendingDramas = [
    { id: 'trending-1', title: 'Top Hits' },
    { id: 'trending-2', title: 'Viral 50' },
    { id: 'trending-3', title: 'Global Hits' },
];

const forYou = [
    { id: 'made-for-you-1', title: 'For You Mix' },
    { id: 'made-for-you-2', title: 'Lofi Beats' },
    { id: 'made-for-you-3', 'title': 'Discovery' },
    { id: 'made-for-you-4', 'title': 'New Releases' },
]

const moreToWatch = [
    { id: 'drops-1', title: 'Ah Beng\'s Guide' },
    { id: 'drops-2', title: 'New Lobang!' },
    { id: 'drops-3', title: 'New Game!' },
    { id: 'recently-1', title: 'Lofi Beats Radio' },
];

const shorts = [
    { id: 'short-1', title: 'Singapore Street Food' },
    { id: 'short-2', title: 'Gardens by the Bay Lights' },
    { id: 'short-3', title: 'Merlion Park Moments'},
    { id: 'short-4', title: 'Funny Cat Moments' },
    { id: 'short-5', title: 'Dance Challenge' },
    { id: 'short-6', title: 'Art & Craft DIY' },
];

const top10Singapore = [
    { id: 'new-drama-1', title: 'My Secret Kopi Stall Romance' },
    { id: 'new-drama-3', title: 'The Last Mama Shop' },
    { id: 'new-drama-2', title: "Ah Beng's Guide to the Galaxy" },
    { id: 'short-1', title: 'Singapore Street Food' },
    { id: 'made-for-you-1', title: 'For You Mix' },
];

const kDramas = [
    { id: 'k-drama-1', title: 'Crash Landing on You' },
    { id: 'k-drama-2', title: 'Itaewon Class' },
    { id: 'k-drama-3', title: 'Vincenzo' },
    { id: 'k-drama-4', title: 'Squid Game' },
    { id: 'k-drama-5', title: 'The Glory' },
];


export default function WatchPage() {
    return <WatchClient 
        topVideos={topVideos} 
        trendingDramas={trendingDramas} 
        forYou={forYou} 
        moreToWatch={moreToWatch} 
        shorts={shorts}
        top10Singapore={top10Singapore}
        kDramas={kDramas}
    />;
}
