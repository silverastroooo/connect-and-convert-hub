
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, BarChart3, Users, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MiniCRM
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <BarChart3 className="inline w-4 h-4 mr-1" />
                  Dashboard
                </a>
                <a href="/campaigns" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <MessageSquare className="inline w-4 h-4 mr-1" />
                  Campaigns
                </a>
                <a href="/audience" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <Users className="inline w-4 h-4 mr-1" />
                  Audience
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">
                  <User className="inline w-4 h-4 mr-1" />
                  {user.email}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                  className="hover:bg-red-50 hover:border-red-200"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Login with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
