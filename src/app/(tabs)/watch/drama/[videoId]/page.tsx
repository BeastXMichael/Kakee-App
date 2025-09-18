
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Play, Plus, Star, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// This is a placeholder. In a real app, you'd fetch this data.
const dramaDetails = {
    'dune-part-two': {
        title: "Dune: Part Two",
        description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
        posterId: "new-drama-1",
        year: 2024,
        rating: "9.1",
        genres: ["Sci-Fi", "Adventure", "Action"]
    },
     'default': {
        title: "Queen of Tears",
        description: "The queen of department stores and the prince of supermarkets weather a marital crisis—until love miraculously begins to bloom again.",
        posterId: "k-drama-1",
        year: 2024,
        rating: "8.4",
        genres: ["Romance", "Comedy", "Drama"]
    }
}

const episodes = [
    { num: 1, title: "The Prophecy", duration: "58m", imageId: "new-drama-1" },
    { num: 2, title: "The Spice", duration: "1h 2m", imageId: "new-drama-2" },
    { num: 3, title: "The Battle", duration: "59m", imageId: "new-drama-3" },
    { num: 4, title: "The Aftermath", duration: "1h 5m", imageId: "k-drama-1" },
]


export default function DramaDetailsPage({ params }: { params: { videoId: string } }) {
  const details = dramaDetails[params.videoId as keyof typeof dramaDetails] || dramaDetails.default;
  const poster = PlaceHolderImages.find(p => p.id === details.posterId);

  return (
    <div className="flex flex-col h-full bg-[#101010] text-white overflow-y-auto no-scrollbar">
      <header className="absolute top-0 left-0 p-4 z-20">
        <Link href="/watch">
          <Button variant="ghost" size="icon" className="bg-black/30 backdrop-blur-sm">
            <ChevronLeft className="w-7 h-7" />
          </Button>
        </Link>
      </header>

      <div className="relative w-full h-60 flex-shrink-0">
        {poster && (
          <Image
            src={poster.imageUrl}
            alt={details.title}
            fill
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] to-transparent"></div>
      </div>

      <main className="p-4 -mt-20 z-10">
        <div className="flex items-end space-x-4">
            {poster && (
            <Image
                src={poster.imageUrl}
                alt={details.title}
                width={128}
                height={192}
                className="w-24 h-36 md:w-32 md:h-48 object-cover rounded-md shadow-lg"
                data-ai-hint={poster.imageHint}
            />
            )}
            <div>
                <h1 className="text-2xl font-extrabold">{details.title}</h1>
                <div className="flex items-center text-sm space-x-2 text-gray-400 mt-1">
                    <span>{details.year}</span>
                    <span className="flex items-center"><Star className="w-3 h-3 mr-1 text-yellow-400" fill="currentColor" /> {details.rating}</span>
                </div>
            </div>
        </div>

        <p className="text-sm mt-4 text-gray-300">
          {details.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
            {details.genres.map(genre => (
                <span key={genre} className="text-xs bg-white/10 px-2 py-1 rounded-full">{genre}</span>
            ))}
        </div>
        
        <div className="flex space-x-2 mt-4">
            <Button className="flex-1 bg-white text-black font-bold hover:bg-gray-200">
                <Play className="w-5 h-5 mr-2" fill="currentColor"/>
                Play
            </Button>
            <Button variant="outline" className="border-white/50 text-white bg-white/10 hover:bg-white/20">
                <Plus className="w-5 h-5 mr-2"/>
                My List
            </Button>
        </div>

        <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Episodes</h2>
            <div className="space-y-4">
                {episodes.map(episode => {
                    const episodeImage = PlaceHolderImages.find(p => p.id === episode.imageId);
                    return (
                        <div key={episode.num} className="flex items-center space-x-4">
                            <div className="w-24 h-14 rounded-md overflow-hidden relative flex-shrink-0">
                                {episodeImage && (
                                    <Image
                                        src={episodeImage.imageUrl}
                                        alt={`Episode ${episode.num}`}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={episodeImage.imageHint}
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold">{episode.num}. {episode.title}</h3>
                                <p className="text-xs text-gray-400">{episode.duration}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </main>
    </div>
  );
}
