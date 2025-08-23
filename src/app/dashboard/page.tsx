"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Start from "@/components/Start";
import ContentIdeas from "@/components/ContentIdeas";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import SavedIdeasPage from "../saved/page";
import MultiStepForm from "@/components/MultiStepForm";
import ControlPanel from "@/components/controlPanel/ControlPanel";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Idea } from "@/types/Idea";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("start");
  const [ideas, setIdeas] = useState<any[]>([]); // lifted state
  const [savedIdea, setSavedIdeas] = useState<Idea[]>([]);

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
        return <ContentIdeas ideas={ideas} />;
      case "saved":
        return <SavedIdeasPage />;
      case "controlPanel":
        return <ControlPanel />;
      case "subscription":
        return <SubscriptionPlans />;
      case "multistepform":
        return (
          <MultiStepForm
            onIdeasGenerated={(generatedIdeas: any[]) => {
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
