
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { 
  LayoutDashboard, 
  Briefcase, 
  LineChart, 
  History, 
  Trophy, 
  Heart, 
  User, 
  Wallet, 
  LogOut, 
  Sun
} from "lucide-react";
import { Button } from "../../components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Briefcase, label: "Portfolio", path: "/portfolio" },
  { icon: LineChart, label: "Trading", path: "/chart" },
  { icon: Heart, label: "Watchlist", path: "/watchlist" },
  { icon: History, label: "History", path: "/history" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
];

const bottomItems = [
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Wallet, label: "Wallet", path: "/wallet" },
];

const Layout = () => {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar fixed h-screen overflow-y-auto border-r border-border">
        {/* Logo area */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/80 rounded-md flex items-center justify-center text-white font-bold">
              I
            </div>
            <h1 className="text-xl font-bold">Inferno</h1>
          </div>
        </div>
        
        {/* Main navigation */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
        
        {/* Bottom section */}
        <div className="px-3 py-4 border-t border-border">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
            
            <div className="sidebar-item cursor-pointer">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Sun className="w-4 h-4 mr-2" />
              <span>Light Mode</span>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 md:ml-64">
        <Navbar />
        <div className="container mx-auto py-4 px-4 md:px-6">
          <Outlet />
        </div>
        
      </main>
    </div>
  );
};

export default Layout;
