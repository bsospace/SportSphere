"use client";

import { Trophy } from 'lucide-react';

export function Header() {
    return (
        <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">Tournament Brackets</h1>
            </div>
        </div>
        </header>
    );
}