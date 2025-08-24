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
import { onSnapshot, doc, updateDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";

// firebase
import { auth, db } from "@/lib/firebase";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("start");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleSaved = async (id: string | number) => {
    const user = auth.currentUser;
    if (!user) return; // no user logged in

    const idea = ideas.find((idea) => idea.id === id);
    if (!idea) return;

    const userRef = doc(db, "users", user.uid);

    if (idea.saved) {
      // remove from savedIdeas
      setIdeas((prev) =>
        prev.map((i) => (i.id === id ? { ...i, saved: false } : i))
      );
      setSavedIdeas((prev) => prev.filter((i) => i.id !== id));

      await updateDoc(userRef, {
        savedIdeas: arrayRemove(idea),
      });
    } else {
      // add to savedIdeas
      const updatedIdea = { ...idea, saved: true };

      setIdeas((prev) =>
        prev.map((i) => (i.id === id ? updatedIdea : i))
      );
      setSavedIdeas((prev) => [...prev, updatedIdea]);

      // if user doc doesn’t exist yet, create it with merge:true
      await setDoc(
        userRef,
        { savedIdeas: arrayUnion(updatedIdea) },
        { merge: true }
      );
    }
  };

  // 🔥 Fetch savedIdeas tied to logged-in user
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSavedIdeas(data.savedIdeas || []);
      } else {
        // If user doc doesn't exist yet, initialize with empty savedIdeas
        setDoc(userRef, { savedIdeas: [] }, { merge: true });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  

  const renderView = () => {
    switch (activeView) {
      case "ideas":
        return <ContentIdeas ideas={ideas} toggleSaved={toggleSaved} />;
      case "saved":
        return (
          <SavedIdeasOnly savedIdeas={savedIdeas} toggleSaved={toggleSaved} />
        );
      case "controlPanel":
        return <ControlPanel />;
      case "subscription":
        return <SubscriptionPlans />;
      case "multistepform":
        return (
          <MultiStepForm
            onIdeasGenerated={(generatedIdeas: Idea[]) => {
              setIdeas(generatedIdeas);
              setActiveView("ideas");
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
