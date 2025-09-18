import ListenClient from "@/components/listen/listen-client";

export default async function ListenPage() {
    const trendingData = {
        trendingContent: [
            'Espresso',
            'Good Luck, Babe!',
            'A Bar Song (Tipsy)',
            'I Had Some Help',
            'Million Dollar Baby',
        ],
    };

    return <ListenClient trendingData={trendingData} />;
}
