import React from 'react';
import { Calendar, CheckCircle, XCircle, PieChart, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_ATTENDANCE } from '../data/mockData';

export function SelfAttendance() {
    const { user } = useAuth();

    if (!user) return null;

    const myAttendance = MOCK_ATTENDANCE.filter(a => a.studentId === user.id);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Self Attendance</h1>
                    <p className="text-gray-500 mt-1">Track your personal attendance records</p>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-100 text-sm font-medium">
                    <AlertCircle className="w-4 h-4" />
                    <span>Minimum 75% required</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myAttendance.map((record) => {
                    const percentage = Math.round((record.attendedClasses / record.totalClasses) * 100);
                    const isLow = percentage < 75;

                    return (
                        <div key={record.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-colors ${isLow ? 'bg-red-50' : 'bg-emerald-50'}`}></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-xl ${isLow ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                        <PieChart className="w-6 h-6" />
                                    </div>
                                    <span className={`text-2xl font-bold ${isLow ? 'text-red-600' : 'text-emerald-600'}`}>
                                        {percentage}%
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-1">{record.subject}</h3>
                                <p className="text-gray-500 text-sm mb-6">Total Classes: {record.totalClasses}</p>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                                            <span className="text-sm font-medium">Attended</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{record.attendedClasses}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <XCircle className="w-4 h-4 text-red-500" />
                                            <span className="text-sm font-medium">Missed</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{record.totalClasses - record.attendedClasses}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${isLow ? 'bg-red-500' : 'bg-emerald-500'}`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 text-right">Last updated: Today</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
