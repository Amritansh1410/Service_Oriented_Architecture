import React from "react";
import { useAuth } from "../context/AuthContext";
import { TeacherDashboard } from "./TeacherDashboard";

import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Bell,
  MoreVertical,
} from "lucide-react";

import {
  MOCK_GROUPS,
  MOCK_ASSIGNMENTS,
  MOCK_ATTENDANCE,
} from "../data/mockData";

export function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading…</div>;
  if (!user) return null;

  // 🔥 If the user is a teacher, load the teacher dashboard
  if (user.role === "teacher") {
    return <TeacherDashboard />;
  }

  // --------------------------
  // STUDENT DASHBOARD (Original)
  // --------------------------

  const userName = user.name ? user.name.split(" ")[0] : "User";

  const activeGroups = MOCK_GROUPS.filter(
    (g) => g.members.includes(user.id) && g.isActive
  ).length;

  const attendanceRecord = MOCK_ATTENDANCE.find(
    (a) => a.studentId === user.id
  );
  const attendancePercentage = attendanceRecord
    ? Math.round(
        (attendanceRecord.attendedClasses / attendanceRecord.totalClasses) * 100
      )
    : 0;

  const pendingAssignments = MOCK_ASSIGNMENTS.filter(
    (a) => a.status === "pending"
  ).length;

  const stats = [
    {
      label: "Active Groups",
      value: activeGroups,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      trend: "+2 new",
    },
    {
      label: "Attendance",
      value: `${attendancePercentage}%`,
      icon: TrendingUp,
      color:
        attendancePercentage < 75 ? "text-red-600" : "text-emerald-600",
      bg:
        attendancePercentage < 75 ? "bg-red-50" : "bg-emerald-50",
      border:
        attendancePercentage < 75 ? "border-red-100" : "border-emerald-100",
      trend:
        attendancePercentage < 75 ? "Low attendance" : "On track",
    },
    {
      label: "Pending Tasks",
      value: pendingAssignments,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      trend: "Due soon",
    },
    {
      label: "Completed",
      value: "12",
      icon: CheckCircle,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      trend: "This week",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-indigo-100 text-lg max-w-xl">
            You have{" "}
            <span className="font-bold text-white">
              {pendingAssignments} pending assignments
            </span>{" "}
            and{" "}
            <span className="font-bold text-white">3 classes</span>{" "}
            scheduled for today.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-md">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white p-6 rounded-2xl border ${stat.border} shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}
              >
                {stat.trend}
              </span>
            </div>

            <p className="text-gray-500 text-sm font-medium">
              {stat.label}
            </p>
            <h3 className="text-3xl font-bold text-gray-900">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Activity
            </h2>
            <button className="text-indigo-600 hover:underline">
              View All
            </button>
          </div>

          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 border-b last:border-b-0 flex gap-5 hover:bg-gray-50 transition"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">
                    New material in Data Structures
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Dr. Priya Singh uploaded “Unit 3 Notes.pdf”.
                  </p>
                </div>

                <span className="text-xs text-gray-400">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Today’s Schedule
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
            {[
              { subject: "Data Structures", time: "10:00 AM", room: "Lab 2" },
              { subject: "Algorithms", time: "11:30 AM", room: "Room 304" },
              { subject: "Database Systems", time: "02:00 PM", room: "Room 201" },
            ].map((cls, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 rounded-xl border-l-4 border-indigo-500"
              >
                <h4 className="font-bold text-gray-900">{cls.subject}</h4>
                <p className="text-gray-500">{cls.room}</p>
                <p className="text-gray-900 font-bold mt-1">{cls.time}</p>
              </div>
            ))}

            <button className="w-full py-3 border-2 border-dashed rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition">
              View Full Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
