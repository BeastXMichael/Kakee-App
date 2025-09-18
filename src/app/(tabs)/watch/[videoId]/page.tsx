
import VideoPlayer from '@/components/watch/video-player';

// This is a basic structure. In a real app, you'd fetch video details
// based on the videoId from the params.
export default function VideoPage({ params }: { params: { videoId: string } }) {
  // For now, we'll render the same generic video player.
  // The videoId is available in `params.videoId` if you want to use it.
  return <VideoPlayer />;
}
