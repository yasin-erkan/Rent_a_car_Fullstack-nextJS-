import Link from 'next/link';
import {Heart, Bell, Settings} from 'lucide-react';
import {getCurrentUser} from '@/lib/auth-utils';
import UserDropdown from './UserDropdown';
import SearchBar from './SearchBar';

export default async function Header() {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <svg
                className="w-5 h-5 md:w-7 md:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              DriveWay
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {/* Icons - Hidden on mobile */}
            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-gray-100 transition-all relative group">
              <Heart className="h-5 w-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
            </button>

            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-gray-100 transition-all relative group">
              <Bell className="h-5 w-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
              <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                1
              </span>
            </button>

            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-gray-100 transition-all group">
              <Settings className="h-5 w-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
            </button>

            {/* User Dropdown */}
            <div className="ml-1 md:ml-2">
              <UserDropdown user={user} isAuthenticated={isAuthenticated} />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3 md:pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
