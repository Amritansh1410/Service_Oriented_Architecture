export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    // Student specific
    section?: string;
    batch?: string; // e.g., "2024-2028"
    rollNumber?: string;
    // Teacher specific
    department?: string;
    subjects?: string[];
}

export interface Group {
    id: string;
    name: string; // e.g., "Data Structures - Section A"
    subject: string;
    section: string;
    teacherId: string;
    teacherName: string;
    academicYear: string; // e.g., "2025-2026"
    createdAt: string;
    isActive: boolean;
    teacherLastActive: string;
    members: string[]; // User IDs
}

export interface Message {
    id: string;
    groupId: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    type: 'text' | 'file' | 'announcement';
    fileUrl?: string;
}

export interface AttendanceRecord {
    id: string;
    studentId: string;
    subject: string;
    totalClasses: number;
    attendedClasses: number;
    lastUpdated: string;
    history: {
        date: string;
        status: 'present' | 'absent';
    }[];
}

export interface OfficialAttendance {
    id: string;
    subject: string;
    section: string;
    date: string;
    teacherId: string;
    records: {
        studentId: string;
        studentName: string;
        status: 'present' | 'absent';
    }[];
    createdAt: string; // For 24h edit window
}

export interface Assignment {
    id: string;
    title: string;
    subject: string;
    description: string;
    dueDate: string;
    teacherId: string;
    studentId?: string; // Added for mock student view
    grade?: string;     // Added for mock student view
    status: 'pending' | 'submitted' | 'graded';
    submissions: {
        studentId: string;
        submittedAt: string;
        fileUrl?: string;
        receivedByTeacher: boolean;
    }[];
}

export interface Resource {
    id: string;
    title: string;
    subject: string;
    teacherId: string;
    teacherName: string;
    type: 'note' | 'pyq' | 'important' | 'other';
    fileUrl: string;
    uploadDate: string;
    downloads: number;
    year: string; // e.g., "2nd Year"
    branch: string; // e.g., "CSE"
}
