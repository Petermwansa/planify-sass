"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Start from "@/components/Start";
import ContentIdeas from "@/components/ContentIdeas";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import MultiStepForm from "@/components/MultiStepForm";
import ControlPanel from "@/components/controlPanel/ControlPanel";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Idea } from "@/types/Idea";
import SavedIdeasOnly from "@/components/SavedIdeas";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("start");
  const [ideas, setIdeas] = useState<any[]>([]); // lifted state
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);

  const handleIdeasGenerated = (newIdeas: Idea[]) => {
    setIdeas(newIdeas);
    setActiveView("ideas"); // switch automatically
  };

  const toggleSaved = (id: number) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, saved: !idea.saved } : idea
      )
    );

    setSavedIdeas((prev) => {
      const idea = ideas.find((idea) => idea.id === id);
      if (!idea) return prev;

      if (idea.saved) {
        // if already saved → remove
        return prev.filter((i) => i.id !== id);
      } else {
        // if not saved → add
        return [...prev, { ...idea, saved: true }];
      }
    });
  };

  const renderView = () => {
    switch (activeView) {
      case "ideas":
        return <ContentIdeas ideas={ideas} toggleSaved={toggleSaved} />;
      case "saved":
        return <SavedIdeasOnly savedIdeas={savedIdeas} toggleSaved={toggleSaved} />;
      case "controlPanel":
        return <ControlPanel />;
      case "subscription":
        return <SubscriptionPlans />;
      case "multistepform":
        return (
          <MultiStepForm
            onIdeasGenerated={(generatedIdeas: Idea[]) => {
              setIdeas(generatedIdeas);
              setActiveView("ideas"); // switch tab automatically
            }}
          />
        );
      default:
        return <Start setActiveView={setActiveView} />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <Sidebar setActiveView={setActiveView} activeView={activeView} />
        <main className="dashboard_main">
          <h1 className="logo">Planify.Ai</h1>

          <div className="start">{renderView()}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
