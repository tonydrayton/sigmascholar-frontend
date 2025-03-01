import React from 'react';
import { BookOpen, Calculator, Brain, Home, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setCurrentPage('home')}
        >
          <Brain className="h-8 w-8 text-emerald-400" />
          <span className="text-2xl font-bold text-green-600">Sigma Scholar</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Button
            onClick={() => setCurrentPage('home')}
            variant="ghost"
            className="flex items-center space-x-1 text-emerald-700"
          >
            <Home className="h-4 w-4 mr-1" />
            <span>Home</span>
          </Button>

          <Button
            onClick={() => setCurrentPage('reading')}
            variant="ghost"
            className="flex items-center space-x-1 text-emerald-700"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            <span>Reading</span>
          </Button>

          <Button
            onClick={() => setCurrentPage('math')}
            variant="ghost"
            className="flex items-center space-x-1 text-emerald-700"
          >
            <Calculator className="h-4 w-4 mr-1" />
            <span>Math</span>
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
