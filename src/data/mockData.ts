import type { User, Group, Message, AttendanceRecord, OfficialAttendance, Assignment, Resource } from '../types';

export const MOCK_USERS: User[] = [
    {
        id: 'student1',
        name: 'Rahul Sharma',
        email: 'rahul@college.edu',
        role: 'student',
        section: 'A',
        batch: '2024-2028',
        rollNumber: 'CSE-24-001',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
    {
        id: 'teacher1',
        name: 'Dr. Priya Singh',
        email: 'priya@college.edu',
        role: 'teacher',
        department: 'CSE',
        subjects: ['Data Structures', 'Algorithms'],
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@college.edu',
        role: 'admin',
    }
];

export const MOCK_GROUPS: Group[] = [
    {
        id: 'g1',
        name: 'Data Structures - Sec A',
        subject: 'Data Structures',
        section: 'A',
        teacherId: 'teacher1',
        teacherName: 'Dr. Priya Singh',
        academicYear: '2025-2026',
        createdAt: '2025-08-01T00:00:00Z',
        isActive: true,
        teacherLastActive: new Date().toISOString(),
        members: ['student1', 'teacher1'],
    },
    {
        id: 'g2',
        name: 'Algorithms - Sec A',
        subject: 'Algorithms',
        section: 'A',
        teacherId: 'teacher1',
        teacherName: 'Dr. Priya Singh',
        academicYear: '2025-2026',
        createdAt: '2025-08-01T00:00:00Z',
        isActive: true,
        teacherLastActive: new Date().toISOString(),
        members: ['student1', 'teacher1'],
    }
];

export const MOCK_MESSAGES: Message[] = [
    {
        id: 'm1',
        groupId: 'g1',
        senderId: 'teacher1',
        senderName: 'Dr. Priya Singh',
        content: 'Welcome to the Data Structures class! Here is the syllabus.',
        timestamp: '2025-08-01T10:00:00Z',
        type: 'text',
    },
    {
        id: 'm2',
        groupId: 'g1',
        senderId: 'teacher1',
        senderName: 'Dr. Priya Singh',
        content: 'Syllabus_2025.pdf',
        timestamp: '2025-08-01T10:05:00Z',
        type: 'file',
        fileUrl: '#',
    }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
    {
        id: 'ar1',
        studentId: 'student1',
        subject: 'Data Structures',
        totalClasses: 45,
        attendedClasses: 38,
        lastUpdated: new Date().toISOString(),
        history: [],
    }
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
    {
        id: 'a1',
        title: 'Linked List Implementation',
        subject: 'Data Structures',
        description: 'Implement a doubly linked list in C++.',
        dueDate: '2025-11-30T23:59:59Z',
        teacherId: 'teacher1',
        studentId: 'student1', // Added
        status: 'pending',
        submissions: [],
    }
];

export const MOCK_RESOURCES: Resource[] = [
    {
        id: 'r1',
        title: 'Unit 1: Introduction to DS',
        subject: 'Data Structures',
        teacherId: 'teacher1',
        teacherName: 'Dr. Priya Singh',
        type: 'note',
        fileUrl: '#',
        uploadDate: '2025-08-05T10:00:00Z',
        downloads: 150,
        year: '2nd Year',
        branch: 'CSE',
    }
];
