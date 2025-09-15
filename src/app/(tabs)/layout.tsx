import BottomNav from "@/components/bottom-nav";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-0 sm:p-4 font-body">
      <div className="max-w-md w-full h-screen sm:h-[812px] bg-background shadow-2xl sm:rounded-[32px] flex flex-col relative overflow-hidden border-4 border-black">
        <div className="flex-grow flex flex-col overflow-hidden relative">
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
