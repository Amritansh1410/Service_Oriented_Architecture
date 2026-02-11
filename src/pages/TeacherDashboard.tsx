import React from "react";
import {
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  PlusCircle,
  TrendingUp,
  CheckCircle,
  MoreVertical,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function TeacherDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const teacherName = user.name?.split(" ")[0] ?? "Teacher";

  // Mock values — replace with Supabase data later
  const stats = [
    {
      label: "Subjects Teaching",
      value: 3,
      icon: BookOpen,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Active Groups",
      value: 5,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Assignments Pending",
      value: 12,
      icon: ClipboardList,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Attendance Pending",
      value: 3,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const schedule = [
    { subject: "Data Structures", time: "09:00 AM", room: "Lab 2", color: "border-l-indigo-500" },
    { subject: "Algorithms", time: "11:00 AM", room: "Room 108", color: "border-l-purple-500" },
    { subject: "DBMS", time: "02:00 PM", room: "Room 204", color: "border-l-pink-500" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {teacherName}! 👩‍🏫</h1>
          <p className="text-indigo-100 text-lg max-w-xl">
            Manage your classes, attendance, assignments, and study resources.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Two-column layout below */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">View all</button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 border-b last:border-0 hover:bg-gray-50 transition-all flex gap-5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">New assignment submitted</h3>
                  <p className="text-gray-600 text-sm">
                    A student submitted the work for your Algorithms assignment.
                  </p>
                </div>

                <span className="text-xs text-gray-400">5m ago</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Schedule */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-6 shadow-sm">
            {schedule.map((cls, index) => (
              <div
                key={index}
                className={`p-4 bg-gray-50 rounded-xl border-l-4 ${cls.color}`}
              >
                <h4 className="font-bold text-gray-900">{cls.subject}</h4>
                <p className="text-gray-500">{cls.room}</p>
                <p className="text-gray-900 font-bold mt-1">{cls.time}</p>
              </div>
            ))}

            <button className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition">
              View full schedule
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="flex items-center gap-3 bg-indigo-600 text-white p-5 rounded-2xl shadow-md hover:bg-indigo-700 transition-all">
          <PlusCircle className="w-6 h-6" />
          <span className="text-lg font-semibold">Add Study Material</span>
        </button>

        <button className="flex items-center gap-3 bg-emerald-600 text-white p-5 rounded-2xl shadow-md hover:bg-emerald-700 transition-all">
          <CheckCircle className="w-6 h-6" />
          <span className="text-lg font-semibold">Manage Attendance</span>
        </button>
      </div>
    </div>
  );
}
