"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Start from "@/components/Start";
import ContentIdeas from "@/components/ContentIdeas";
import Settings from "@/components/Settings";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import SavedIdeasPage from "../saved/page";
import MultiStepForm from "@/components/MultiStepForm";


const Dashboard = () => {
  const [activeView, setActiveView] = useState("start");

  const renderView = () => {
    switch (activeView) {
      case "ideas":
        return <ContentIdeas />;
      case "saved":
        return <SavedIdeasPage />;
      case "settings":
        return <Settings />;
      case "subscription":
        return <SubscriptionPlans />;
      case "multistepform": 
        return <MultiStepForm />
      default:
        return <Start setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar setActiveView={setActiveView} activeView={activeView} />
      <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
        <h1 className="logo">Planify.Ai</h1>

        <div className="start">{renderView()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
