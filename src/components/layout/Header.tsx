import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { cn } from '../../utils/cn';

interface HeaderProps {
    onMenuClick: () => void;
    className?: string;
}

export function Header({ onMenuClick, className }: HeaderProps) {
    return (
        <header className={cn("h-16 px-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-100 lg:hidden sticky top-0 z-20", className)}>
            <div className="flex items-center gap-3">
                <button onClick={onMenuClick} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-600">
                    <Menu className="w-6 h-6" />
                </button>
                <span className="font-bold text-lg text-gray-900">EduConnect</span>
            </div>
            <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <ThemeToggle />
            </div>
        </header>
    );
}
