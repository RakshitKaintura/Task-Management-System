import { create } from 'zustand';

interface UIState {
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const useUIStore = create<UIState>((set) => ({
  isSidebarCollapsed: false,
  isMobileMenuOpen: false,
  theme: 'system',
  
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  
  setTheme: (theme) => {
    set({ theme });
    // Apply theme to document
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
      
      localStorage.setItem('theme', theme);
    }
  },
}));

export default useUIStore;
