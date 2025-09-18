
import WatchClient from "./watch-client";

const trendingDramas = [
    { id: 'trending-1', title: 'Shōgun' },
    { id: 'trending-2', title: 'Fallout' },
    { id: 'trending-3', title: 'Baby Reindeer' },
];

const forYou = [
    { id: 'made-for-you-1', title: 'For You Mix' },
    { id: 'made-for-you-2', title: 'Lofi Beats' },
    { id: 'made-for-you-3', 'title': 'Discovery' },
    { id: 'made-for-you-4', 'title': 'New Releases' },
]

const realityShows = [
    { id: 'k-drama-1', title: '피지컬: 100 (Physical: 100)' },
    { id: 'k-drama-2', title: '솔로지옥 (Single\'s Inferno)' },
    { id: 'k-drama-3', title: '데블스 플랜 (The Devil\'s Plan)' },
    { id: 'k-drama-4', title: '서진이네 (Jinny\'s Kitchen)' },
];

const newAndTrending = [
    { id: 'new-drama-1', title: 'Dune: Part Two' },
    { id: 'new-drama-2', title: "Godzilla x Kong: The New Empire" },
    { id: 'new-drama-3', title: "Civil War" },
    { id: 'drops-1', title: 'The Ministry of Ungentlemanly Warfare' },
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
    { id: 'new-drama-1', title: 'Dune: Part Two' },
    { id: 'new-drama-3', title: 'Civil War' },
    { id: 'new-drama-2', title: "Godzilla x Kong: The New Empire" },
    { id: 'short-1', title: 'Singapore Street Food' },
    { id: 'k-drama-1', title: 'Queen of Tears' },
];

const kDramas = [
    { id: 'k-drama-1', title: 'Queen of Tears' },
    { id: 'k-drama-2', title: 'Lovely Runner' },
    { id: 'k-drama-3', title: 'Vincenzo' },
    { id: 'k-drama-4', title: 'Squid Game' },
    { id: 'k-drama-5', title: 'The Glory' },
];

const regularVideos = [
    { id: 'regular-video-1', title: 'How to Make the Perfect Kopi' },
    { id: 'regular-video-2', title: 'Exploring Pulau Ubin' },
    { id: 'regular-video-3', title: 'Top 5 Hawker Centre Dishes' },
];


export default function WatchPage() {
    return <WatchClient 
        trendingDramas={trendingDramas} 
        forYou={forYou} 
        realityShows={realityShows}
        newAndTrending={newAndTrending}
        shorts={shorts}
        top10Singapore={top10Singapore}
        kDramas={kDramas}
        regularVideos={regularVideos}
    />;
}
