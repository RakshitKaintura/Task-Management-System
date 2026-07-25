import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left panel - Branding (hidden on small screens) */}
      <div 
        className="hidden md:flex flex-col justify-between p-10 text-white relative overflow-hidden"
        style={{
          backgroundImage: "url('/Importance-of-Time-Management-in-the-Workplace-to-be-More-Effective-and-Productive.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Removed dark overlay as requested */}
        
        <div className="relative z-10 flex items-center gap-2 font-bold text-2xl drop-shadow-md">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white h-5 w-5"
            >
              <path d="M12 2v20" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          TaskFlow AI
        </div>
        
        <div className="relative z-10 space-y-6 drop-shadow-md bg-black/20 p-4 rounded-xl backdrop-blur-sm">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This platform has completely transformed how I manage my daily tasks. 
              The AI breakdown feature is like having a personal project manager."
            </p>
            <footer className="text-sm text-zinc-400">Sofia Davis, Product Designer</footer>
          </blockquote>
        </div>
      </div>

      {/* Right panel - Auth Forms */}
      <div className="flex flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="flex items-center gap-2 font-bold text-2xl md:hidden mb-8 justify-center">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white h-5 w-5"
              >
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            TaskFlow AI
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
