import NowPlayingBar from "@/components/listen/now-playing-bar";

export default function ListenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-grow relative overflow-hidden">
        {children}
      </div>
      <NowPlayingBar />
    </div>
  );
}
