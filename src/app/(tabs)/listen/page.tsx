import ListenClient from "@/components/listen/listen-client";
import { predictTrendingContent } from '@/ai/flows/trending-content-prediction';

export default async function ListenPage() {
    const trendingData = await predictTrendingContent({ category: 'Listen' });

    return <ListenClient trendingData={trendingData} />;
}