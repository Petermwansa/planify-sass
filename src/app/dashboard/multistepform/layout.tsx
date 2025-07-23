"use client";

import "../../../styles/globals.css";

export default function DashboardLayout ({children}: {children: React.ReactNode}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
        <h1 className="logo">Planify.Ai</h1>
    
        {children}
      </main>
    </div>
  );
};

