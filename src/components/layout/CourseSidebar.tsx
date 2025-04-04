
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Book, Home, Upload, User, Settings, LogOut } from 'lucide-react';
import { UserContext } from './MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const CourseSidebar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const mainMenuItems = [
    { title: "Início", path: "/", icon: Home },
    { title: "Módulos", path: "/modules", icon: Book },
  ];

  const adminMenuItems = [
    { title: "Admin", path: "/admin", icon: Settings },
    { title: "Uploads", path: "/uploads", icon: Upload },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-2">
        <div className="flex items-center">
          <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">E</div>
          <div className="ml-2 text-lg font-semibold">Curso de Inglês</div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3 mb-6">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role === 'admin' ? 'Administrador' : 'Aluno'}</p>
            </div>
          </div>
          
          <SidebarMenu>
            {mainMenuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild active={location.pathname === item.path}>
                  <Link to={item.path} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            
            {isAdmin && (
              <>
                <SidebarMenuItem>
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1 mt-4">
                    Administração
                  </div>
                </SidebarMenuItem>
                
                {adminMenuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild active={location.pathname === item.path}>
                      <Link to={item.path} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </>
            )}
          </SidebarMenu>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarMenuButton asChild className="w-full">
          <div className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
      
      <SidebarTrigger />
    </Sidebar>
  );
};
