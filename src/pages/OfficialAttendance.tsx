import React from 'react';
import { Calendar, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function OfficialAttendance() {
    const { user } = useAuth();

    if (!user) return null;

    // Mock official data - in real app this would come from university database
    const officialData = [
        { subject: 'Data Structures', attended: 24, total: 30, lastUpdated: '2024-03-10' },
        { subject: 'Algorithms', attended: 20, total: 28, lastUpdated: '2024-03-11' },
        { subject: 'Database Systems', attended: 18, total: 20, lastUpdated: '2024-03-09' },
        { subject: 'Operating Systems', attended: 22, total: 25, lastUpdated: '2024-03-10' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldCheck className="w-8 h-8 text-blue-200" />
                        <h1 className="text-3xl font-bold">Official Attendance Records</h1>
                    </div>
                    <p className="text-blue-100 max-w-2xl">
                        These records are synced directly with the university database. If you notice any discrepancies, please contact the administration office immediately.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Subject</th>
                                <th className="text-center py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Attended</th>
                                <th className="text-center py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Total</th>
                                <th className="text-center py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Percentage</th>
                                <th className="text-right py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {officialData.map((record, index) => {
                                const percentage = Math.round((record.attended / record.total) * 100);
                                const isLow = percentage < 75;

                                return (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-gray-900">{record.subject}</div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-gray-700 font-medium">
                                                {record.attended}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center text-gray-500">
                                            {record.total}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className={`w-16 h-2 rounded-full overflow-hidden bg-gray-100`}>
                                                    <div
                                                        className={`h-full rounded-full ${isLow ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                                <span className={`font-bold text-sm ${isLow ? 'text-red-600' : 'text-emerald-600'}`}>
                                                    {percentage}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right text-sm text-gray-500">
                                            {new Date(record.lastUpdated).toLocaleDateString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-amber-800">Discrepancy in records?</h4>
                    <p className="text-sm text-amber-700 mt-1">
                        If your self-attendance differs significantly from official records, please submit a correction request form at the department office within 3 working days.
                    </p>
                </div>
            </div>
        </div>
    );
}
