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
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";

// firebase
import { auth, db } from "@/lib/firebase";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("start");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Save / remove ideas to Firestore
  const toggleSaved = async (id: string | number) => {
    const user = auth.currentUser;
    if (!user) return;

    const idea = ideas.find((idea) => idea.id === id);
    if (!idea) return;

    const userRef = doc(db, "users", user.uid);

    if (idea.saved) {
      // remove from saved
      const updatedIdea = { ...idea, saved: false };
      setIdeas((prev) =>
        prev.map((i) => (i.id === id ? updatedIdea : i))
      );
      setSavedIdeas((prev) => prev.filter((i) => i.id !== id));

      await updateDoc(userRef, {
        savedIdeas: arrayRemove(idea),
      });
    } else {
      // add to saved
      const updatedIdea = { ...idea, saved: true };
      setIdeas((prev) =>
        prev.map((i) => (i.id === id ? updatedIdea : i))
      );
      setSavedIdeas((prev) => [...prev, updatedIdea]);

      await setDoc(
        userRef,
        { savedIdeas: arrayUnion(updatedIdea) },
        { merge: true }
      );
    }
  };

  // ✅ Persist generated ideas to Firestore
  const handleIdeasGenerated = async (generatedIdeas: Idea[]) => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    // set local state
    setIdeas(generatedIdeas);
    setActiveView("ideas");

    // save to Firestore (overwrites ideas array, but keeps savedIdeas)
    await setDoc(
      userRef,
      { ideas: generatedIdeas },
      { merge: true }
    );
  };

  // ✅ Listen for Firestore updates (both ideas & savedIdeas)
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setIdeas(data.ideas || []);
        setSavedIdeas(data.savedIdeas || []);
      } else {
        // initialize if new user
        setDoc(userRef, { ideas: [], savedIdeas: [] }, { merge: true });
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
        return <MultiStepForm onIdeasGenerated={handleIdeasGenerated} />;
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
          <div className="start">{loading ? <p>Loading...</p> : renderView()}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
