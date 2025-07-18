"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Start from "@/components/Start";
import ContentIdeas from "@/components/ContentIdeas";
import Settings from "@/components/Settings";
import SavedIdeas from "@/components/SavedIdeas";
import SubscriptionPlans from "@/components/SubscriptionPlans";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("start");

  const renderView = () => {
    switch (activeView) {
      case "ideas":
        return <ContentIdeas />;
      case "saved":
        return <SavedIdeas />;
      case "search":
        return <Settings />;
      case "settings":
        return <Settings />;
      case "subscription":
        return <SubscriptionPlans />;
      case "start":
      default:
        return <Start />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
        <h1 className="logo">Planify.Ai</h1>
        <div className="start">{renderView()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
