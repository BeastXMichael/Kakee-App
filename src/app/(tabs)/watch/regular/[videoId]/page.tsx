
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThumbsUp, MessageCircle, Share2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// This is a placeholder. In a real app, you'd fetch this data.
const videoDetails = {
    'regular-video-1': {
        title: "How to Make the Perfect Kopi",
        description: "Your comprehensive guide to brewing the perfect cup of Singaporean coffee at home. From the right beans to the perfect 'pull', we've got you covered.",
        views: "1.2M views",
        uploadDate: "2 days ago",
    },
    'default': {
        title: "Top 5 Hawker Centre Dishes You MUST Try",
        description: "Join us on a culinary journey as we explore the best and most iconic dishes from Singapore's vibrant hawker centres.",
        views: "5.6M views",
        uploadDate: "1 week ago",
    }
}

const relatedVideos = [
    { id: 'regular-video-2', title: 'Exploring Pulau Ubin' },
    { id: 'regular-video-3', title: 'Top 5 Hawker Centre Dishes' },
    { id: 'new-drama-1', title: 'Dune: Part Two' },
    { id: 'short-1', title: 'Singapore Street Food' },
]

export default function RegularVideoPage({ params }: { params: { videoId: string } }) {
  const details = videoDetails[params.videoId as keyof typeof videoDetails] || videoDetails.default;
  const videoImage = PlaceHolderImages.find(p => p.id === params.videoId) || PlaceHolderImages.find(p => p.id === 'regular-video-1');

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 overflow-y-auto no-scrollbar">
        <header className="p-4 flex items-center gap-4 flex-shrink-0">
            <Link href="/watch">
                <Button variant="ghost" size="icon">
                    <ChevronLeft className="w-7 h-7" />
                </Button>
            </Link>
            <h1 className="text-lg font-bold truncate">{details.title}</h1>
        </header>

        <div className="w-full aspect-video bg-black flex-shrink-0">
            {videoImage && (
                <Image
                    src={videoImage.imageUrl}
                    alt={details.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                />
            )}
        </div>

        <main className="p-4 flex-grow">
            <h2 className="text-xl font-bold">{details.title}</h2>
            <div className="text-sm text-gray-500 mt-1">
                <span>{details.views}</span> &bull; <span>{details.uploadDate}</span>
            </div>

            <div className="flex items-center justify-around bg-gray-100 p-2 rounded-full my-4">
                <Button variant="ghost" className="flex items-center space-x-2 text-gray-600">
                    <ThumbsUp className="w-5 h-5"/>
                    <span>15K</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2 text-gray-600">
                    <MessageCircle className="w-5 h-5"/>
                    <span>1.2K</span>
                </Button>
                 <Button variant="ghost" className="flex items-center space-x-2 text-gray-600">
                    <Share2 className="w-5 h-5"/>
                    <span>Share</span>
                </Button>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg text-sm">
                <p>{details.description}</p>
            </div>

            <div className="mt-6">
                <h3 className="font-bold text-lg mb-3">Up Next</h3>
                <div className="space-y-3">
                    {relatedVideos.map(video => {
                        const image = PlaceHolderImages.find(p => p.id === video.id);
                        return (
                             <Link href="#" key={video.id} className="flex items-center space-x-3">
                                <div className="w-32 h-18 rounded-lg overflow-hidden relative flex-shrink-0">
                                    {image && (
                                        <Image
                                            src={image.imageUrl}
                                            alt={video.title}
                                            width={160}
                                            height={90}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <p className="font-semibold text-sm flex-grow">{video.title}</p>
                            </Link>
                        )
                    })}
                </div>
            </div>

        </main>
    </div>
  );
}
