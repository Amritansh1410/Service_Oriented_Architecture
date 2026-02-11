import React from 'react';
import { Users, Book, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Group } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface GroupCardProps {
    group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Book className="w-6 h-6" />
                </div>
                <Badge variant={group.isActive ? 'success' : 'neutral'}>
                    {group.isActive ? 'Active' : 'Archived'}
                </Badge>
            </div>

            <h3 className="text-lg font-bold text-text-primary mb-1">{group.subject}</h3>
            <p className="text-sm text-text-secondary mb-4">Section {group.section} • {group.academicYear}</p>

            <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        {group.teacherName.charAt(0)}
                    </div>
                    <span>{group.teacherName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Users className="w-4 h-4" />
                    <span>{group.members.length} Members</span>
                </div>
            </div>

            <Link to={`/groups/${group.id}`}>
                <Button className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Open Group
                </Button>
            </Link>
        </Card>
    );
}
