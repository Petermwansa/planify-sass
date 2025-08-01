"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Start from "@/components/Start";
import ContentIdeas from "@/components/ContentIdeas";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import SavedIdeasPage from "../saved/page";
import MultiStepForm from "@/components/MultiStepForm";
import ControlPanel from "@/components/controlPanel/ControlPanel";


const Dashboard = () => {
  const [activeView, setActiveView] = useState("start");

  const renderView = () => {
    switch (activeView) {
      case "ideas":
        return <ContentIdeas />;
      case "saved":
        return <SavedIdeasPage />;
      case "controlPanel":
        return <ControlPanel />;
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
      <main className="dashboard_main">
        <h1 className="logo">Planify.Ai</h1>

        <div className="start">{renderView()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
