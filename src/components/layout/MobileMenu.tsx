import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';
import { useLocation } from 'react-router-dom';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        onClose();
    }, [location.pathname, onClose]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
                isOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
            )}
        >
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/50 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={cn(
                    "absolute top-0 left-0 bottom-0 w-72 bg-surface shadow-xl transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="absolute top-4 right-4 z-10">
                    <Button variant="ghost" size="sm" onClick={onClose} className="p-1 h-8 w-8">
                        <X className="w-5 h-5" />
                    </Button>
                </div>
                <Sidebar className="border-none w-full" />
            </div>
        </div>
    );
}
