import React, { useState } from 'react';
import { Search, Filter, BookOpen, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_GROUPS } from '../data/mockData';
import { Link } from 'react-router-dom';

export function SubjectGroups() {
    const { user } = useAuth();
    const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('all');
    const [search, setSearch] = useState('');

    if (!user) return null;

    const myGroups = MOCK_GROUPS.filter(g => g.members.includes(user.id));

    const filteredGroups = myGroups.filter(group => {
        const matchesSearch = group.subject.toLowerCase().includes(search.toLowerCase()) ||
            group.teacherName.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all'
            ? true
            : filter === 'active' ? group.isActive : !group.isActive;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Subject Groups</h1>
                    <p className="text-gray-500 mt-1">Access your class materials and discussions</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search subjects..."
                            className="pl-10 pr-4 h-11 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none w-full sm:w-64 transition-all shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex bg-gray-100/80 p-1 rounded-xl">
                        {['all', 'active', 'archived'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${filter === f
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filteredGroups.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Filter className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No groups found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGroups.map(group => (
                        <Link
                            to={`/groups/${group.id}`}
                            key={group.id}
                            className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${group.isActive
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                                        }`}>
                                        {group.isActive ? 'Active' : 'Archived'}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                    {group.subject}
                                </h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    Section {group.section} • {group.teacherName}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <Users className="w-4 h-4" />
                                        <span>{group.members.length} Members</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
