
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CourseSidebar } from './CourseSidebar';
import { Toaster } from '@/components/ui/sonner';
import { User } from '@/types';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const UserContext = React.createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [user, setUser] = useState<User | null>({
    id: "user-1",
    name: "Aluno Exemplo",
    email: "aluno@exemplo.com",
    role: "student"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <CourseSidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          <Toaster />
        </div>
      </SidebarProvider>
    </UserContext.Provider>
  );
};
