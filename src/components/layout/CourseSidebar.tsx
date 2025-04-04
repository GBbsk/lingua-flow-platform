
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
import { 
  Book, 
  Home,
  Upload,
  User,
  Settings,
  LogOut,
  Bookmark,
  FileText,
  GraduationCap
} from 'lucide-react';
import { UserContext } from './MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

export const CourseSidebar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const mainMenuItems = [
    { title: "Início", path: "/home", icon: Home },
    { title: "Módulos", path: "/modules", icon: Book },
    { title: "Materiais", path: "/modules", icon: FileText },
    { title: "Meu Progresso", path: "/modules", icon: GraduationCap },
  ];

  const adminMenuItems = [
    { title: "Admin", path: "/admin", icon: Settings },
    { title: "Uploads", path: "/uploads", icon: Upload },
  ];

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="px-4 py-4 border-b bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold shadow-md">E</div>
          <div className="ml-3 text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Curso de Inglês</div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3 mb-6 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
            <Avatar className="border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary-foreground">{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role === 'admin' ? 'Administrador' : 'Aluno'}</p>
            </div>
          </div>
          
          <SidebarMenu>
            {mainMenuItems.map((item) => (
              <SidebarMenuItem key={item.path + item.title}>
                <SidebarMenuButton asChild data-active={location.pathname === item.path}>
                  <Link to={item.path} className="flex items-center gap-3 py-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            
            {isAdmin && (
              <>
                <SidebarMenuItem>
                  <div className="text-xs font-medium text-muted-foreground px-2 py-3 mt-4 border-t">
                    Administração
                  </div>
                </SidebarMenuItem>
                
                {adminMenuItems.map((item) => (
                  <SidebarMenuItem key={item.path + item.title}>
                    <SidebarMenuButton asChild data-active={location.pathname === item.path}>
                      <Link to={item.path} className="flex items-center gap-3 py-2">
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
      
      <SidebarFooter className="p-4 border-t">
        <SidebarMenuButton asChild className="w-full">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </button>
        </SidebarMenuButton>
      </SidebarFooter>
      
      <SidebarTrigger />
    </Sidebar>
  );
};
