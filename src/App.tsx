import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

// Pages
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import ContactAdministrator from "./pages/contactadmin";
import ResetPass from "./pages/resetpass";
import ForgotPassword from "./pages/forgotpass";
import { SubjectGroups } from "./pages/SubjectGroups";
import { GroupDetail } from "./pages/GroupDetail";
import { SelfAttendance } from "./pages/SelfAttendance";
import { OfficialAttendance } from "./pages/OfficialAttendance";
import { Assignments } from "./pages/Assignments";
import { TeacherResources } from "./pages/TeacherResources";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/contact-admin" element={<ContactAdministrator />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="groups" element={<SubjectGroups />} />
            <Route path="groups/:groupId" element={<GroupDetail />} />
            <Route path="attendance" element={<SelfAttendance />} />
            <Route path="attendance/official" element={<OfficialAttendance />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="resources" element={<TeacherResources />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
