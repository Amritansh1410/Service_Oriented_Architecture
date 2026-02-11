import React, { useState } from 'react';
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, Upload, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_ASSIGNMENTS } from '../data/mockData';

export function Assignments() {
    const { user } = useAuth();
    const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

    if (!user) return null;

    const myAssignments = MOCK_ASSIGNMENTS.filter(a => a.studentId === user.id);

    const filteredAssignments = myAssignments.filter(a => {
        if (filter === 'all') return true;
        return a.status === filter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'submitted': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'graded': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'submitted': return <CheckCircle className="w-4 h-4" />;
            case 'graded': return <FileText className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Assignments</h1>
                    <p className="text-gray-500 mt-1">Manage your tasks and deadlines</p>
                </div>

                <div className="flex bg-gray-100/80 p-1 rounded-xl self-start md:self-auto">
                    {['all', 'pending', 'submitted', 'graded'].map((f) => (
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

            <div className="grid grid-cols-1 gap-4">
                {filteredAssignments.map((assignment) => (
                    <div key={assignment.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${getStatusColor(assignment.status)} bg-opacity-50`}>
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            {assignment.title}
                                        </h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 capitalize ${getStatusColor(assignment.status)}`}>
                                            {getStatusIcon(assignment.status)}
                                            {assignment.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-2">{assignment.subject}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                        </span>
                                        {assignment.grade && (
                                            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                                Grade: {assignment.grade}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 md:border-l md:border-gray-100 md:pl-6">
                                {assignment.status === 'pending' && (
                                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                        <Upload className="w-4 h-4" />
                                        Submit Work
                                    </button>
                                )}
                                {assignment.status !== 'pending' && (
                                    <button className="px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-xl transition-colors">
                                        View Submission
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {filteredAssignments.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Filter className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No assignments found</h3>
                        <p className="text-gray-500 mt-2">You're all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
