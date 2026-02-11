import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, FileText, Download, Users, Clock, AlertTriangle, MoreVertical, Phone, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_GROUPS, MOCK_MESSAGES, MOCK_RESOURCES, MOCK_USERS } from '../data/mockData';
import { cn } from '../utils/cn';
import type { Message } from '../types';

export function GroupDetail() {
    const { groupId } = useParams();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'chat' | 'materials' | 'members'>('chat');
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const group = MOCK_GROUPS.find(g => g.id === groupId);

    useEffect(() => {
        if (groupId) {
            const groupMessages = MOCK_MESSAGES.filter(m => m.groupId === groupId);
            setMessages(groupMessages);
        }
    }, [groupId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, activeTab]);

    if (!group || !user) return <div>Group not found</div>;

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg: Message = {
            id: Date.now().toString(),
            groupId: group.id,
            senderId: user.id,
            senderName: user.name,
            content: newMessage,
            timestamp: new Date().toISOString(),
            type: 'text',
        };

        setMessages([...messages, msg]);
        setNewMessage('');
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-3xl shadow-xl shadow-indigo-100 overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <Link to="/groups" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            {group.subject.charAt(0)}
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900">{group.subject}</h1>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                {group.members.length} members • {group.teacherName}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-indigo-600 transition-colors">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-indigo-600 transition-colors">
                        <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50/50 px-4 shrink-0">
                {['chat', 'materials', 'members'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={cn(
                            "px-6 py-3 font-medium text-sm border-b-2 transition-all capitalize",
                            activeTab === tab
                                ? "border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 min-h-0 relative bg-gray-50/30">
                {/* Chat Tab */}
                {activeTab === 'chat' && (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {messages.map((msg) => {
                                const isMe = msg.senderId === user.id;
                                return (
                                    <div key={msg.id} className={cn("flex gap-3", isMe ? "flex-row-reverse" : "flex-row")}>
                                        {!isMe && (
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                                                {msg.senderName.charAt(0)}
                                            </div>
                                        )}
                                        <div className={cn(
                                            "max-w-[70%] rounded-2xl px-5 py-3 shadow-sm",
                                            isMe
                                                ? "bg-indigo-600 text-white rounded-br-none"
                                                : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                                        )}>
                                            {!isMe && <p className="text-xs font-bold mb-1 text-indigo-600">{msg.senderName}</p>}

                                            {msg.type === 'file' ? (
                                                <div className="flex items-center gap-3 bg-black/10 p-3 rounded-xl backdrop-blur-sm">
                                                    <div className="p-2 bg-white/20 rounded-lg">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm underline decoration-white/50">{msg.content}</p>
                                                        <p className="text-xs opacity-70">PDF Document</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-sm leading-relaxed">{msg.content}</p>
                                            )}

                                            <p className={cn("text-[10px] mt-2 text-right", isMe ? "text-indigo-200" : "text-gray-400")}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={handleSendMessage} className="flex gap-2 items-center bg-gray-50 p-2 rounded-full border border-gray-200 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
                                <button type="button" className="p-2 hover:bg-gray-200 rounded-full text-gray-400 transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-900 placeholder-gray-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Materials Tab */}
                {activeTab === 'materials' && (
                    <div className="p-6 overflow-y-auto h-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {MOCK_RESOURCES.filter(r => r.subject === group.subject).map(resource => (
                                <div key={resource.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{resource.title}</h4>
                                            <p className="text-sm text-gray-500">Uploaded by {resource.teacherName}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(resource.uploadDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            {MOCK_RESOURCES.filter(r => r.subject === group.subject).length === 0 && (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <p>No materials uploaded yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Members Tab */}
                {activeTab === 'members' && (
                    <div className="p-6 overflow-y-auto h-full">
                        <div className="space-y-6 max-w-3xl mx-auto">
                            <div>
                                <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-4">Teacher</h3>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                                    <img src={`https://ui-avatars.com/api/?name=${group.teacherName}&background=random`} alt="" className="w-12 h-12 rounded-full ring-2 ring-indigo-100" />
                                    <div>
                                        <p className="font-bold text-gray-900">{group.teacherName}</p>
                                        <p className="text-sm text-indigo-600 font-medium">Faculty Head</p>
                                    </div>
                                    <span className="ml-auto px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase">Admin</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-4">Students ({group.members.length - 1})</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {group.members.filter(id => id !== group.teacherId).map(memberId => {
                                        const member = MOCK_USERS.find(u => u.id === memberId) || { name: 'Unknown User', role: 'student' };
                                        return (
                                            <div key={memberId} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:shadow-sm transition-all">
                                                <img src={`https://ui-avatars.com/api/?name=${member.name}&background=random`} alt="" className="w-10 h-10 rounded-full" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{member.name}</p>
                                                    <p className="text-xs text-gray-500 capitalize">{member.role}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
