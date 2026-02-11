import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
    value: number; // 0 to 100
    max?: number;
    showLabel?: boolean;
    className?: string;
    colorClass?: string;
}

export function ProgressBar({ value, max = 100, showLabel = false, className, colorClass }: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    // Default color logic: Red if < 75%, Green if >= 75%
    const barColor = colorClass || (percentage < 75 ? 'bg-danger' : 'bg-success');

    return (
        <div className={cn("w-full", className)}>
            <div className="flex justify-between mb-1">
                {showLabel && <span className="text-sm font-medium text-text-secondary">Attendance</span>}
                {showLabel && <span className="text-sm font-medium text-text-primary">{Math.round(percentage)}%</span>}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                <div
                    className={cn("h-2.5 rounded-full transition-all duration-500", barColor)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
