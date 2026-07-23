import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import AuthProvider from '@/components/auth/AuthProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 sm:gap-4 md:py-0 w-full overflow-hidden">
          <Topbar />
          <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-y-auto w-full">
            <div className="mx-auto w-full max-w-7xl pb-8 mt-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
