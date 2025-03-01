"use client"

import React from 'react';
import { BookOpen, Brain, Home, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">Sigma Scholar</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="flex items-center space-x-1 text-emerald-700"
          >
            <Home className="h-4 w-4 mr-1" />
            <span>Home</span>
          </Button>

          <Button
            onClick={() => router.push('/chat')}
            variant="ghost"
            className="flex items-center space-x-1 text-emerald-700"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            <span>Chat</span>
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="hidden md:flex items-center space-x-1 text-emerald-700"
          >
            <User className="h-4 w-4 mr-1" />
            <span>Account</span>
          </Button>

          <Button className="flex items-center space-x-1">
            <LogIn className="h-4 w-4 mr-1" />
            <span>Sign In</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
