"use client";
import "./globals.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navigation() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user || pathname === '/login') return null;

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 border-b border-slate-200 shadow-sm transition-all">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
            CRM System
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <Link 
            href="/dashboard" 
            className={`text-sm font-semibold transition-colors ${pathname === '/dashboard' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/leads" 
            className={`text-sm font-semibold transition-colors ${pathname === '/leads' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Leads
          </Link>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <button 
            onClick={logout} 
            className="text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 min-h-screen font-sans text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        <AuthProvider>
          <Navigation />
          <main className="container mx-auto px-6 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
