import React, { useState } from 'react';
import { Search, FileText, Download, Folder, Video, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_RESOURCES } from '../data/mockData';

export function TeacherResources() {
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState<'all' | 'pdf' | 'video' | 'link'>('all');

    if (!user) return null;

    // Mock resource types for demo
    const resources = MOCK_RESOURCES.map(r => ({
        ...r,
        type: Math.random() > 0.6 ? 'video' : Math.random() > 0.5 ? 'link' : 'pdf'
    }));

    const filteredResources = resources.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
            r.subject.toLowerCase().includes(search.toLowerCase());
        const matchesType = selectedType === 'all' || r.type === selectedType;
        return matchesSearch && matchesType;
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video className="w-6 h-6" />;
            case 'link': return <LinkIcon className="w-6 h-6" />;
            default: return <FileText className="w-6 h-6" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'video': return 'bg-red-50 text-red-600';
            case 'link': return 'bg-blue-50 text-blue-600';
            default: return 'bg-orange-50 text-orange-600';
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 opacity-20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
                    <p className="text-gray-400 max-w-xl mb-8">
                        Access study materials, lecture recordings, and reference links shared by your professors.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title or subject..."
                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-sm transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/10">
                            {['all', 'pdf', 'video', 'link'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedType(t as any)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${selectedType === t
                                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                    <div key={resource.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${getTypeColor(resource.type)} group-hover:scale-110 transition-transform duration-300`}>
                                {getTypeIcon(resource.type)}
                            </div>
                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>

                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {resource.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">{resource.subject}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                                <Folder className="w-3 h-3" />
                                {resource.teacherName}
                            </span>
                            <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
