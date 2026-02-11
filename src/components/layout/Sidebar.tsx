import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    ClipboardList,
    BookOpen,
    LogOut,
    GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

export function Sidebar({ className }: { className?: string }) {
    const { user, logout } = useAuth();

    const links = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/groups', icon: Users, label: 'Subject Groups' },
        { to: '/attendance', icon: CalendarCheck, label: 'Attendance' },
        { to: '/assignments', icon: ClipboardList, label: 'Assignments' },
        { to: '/resources', icon: BookOpen, label: 'Resources' },
    ];

    return (
        <aside className={cn("flex flex-col h-full bg-white border-r border-gray-100 shadow-sm", className)}>
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-900 tracking-tight">EduConnect</span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-indigo-50 text-indigo-600 font-bold shadow-sm"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            )
                        }
                    >
                        <link.icon className={cn("w-5 h-5 transition-colors",
                            // isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"
                        )} />
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-4 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer">
                    <img
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate capitalize">{user?.role}</p>
                    </div>
                </div>
                <button
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 font-medium text-sm"
                    onClick={logout}
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
