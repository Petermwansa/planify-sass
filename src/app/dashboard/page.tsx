import React from "react";
import Sidebar from "@/components/Sidebar";
import Start from "@/components/Start";



const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
        <h1 className="logo">Planify.Ai</h1>
        <div className="start">
          <Start />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
