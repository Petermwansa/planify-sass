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
import { onSnapshot } from "firebase/firestore";

// for the firebase
import { auth, db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("start");
  const [ideas, setIdeas] = useState<any[]>([]); // lifted state
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleSaved = async (id: number) => {
    const user = auth.currentUser;
    if (!user) return; // no user logged in

    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, saved: !idea.saved } : idea
      )
    );

    const idea = ideas.find((idea) => idea.id === id);
    if (!idea) return;

    const userRef = doc(db, "users", user.uid);

    if (idea.saved) {
      // ✅ Remove from savedIdeas in state + Firestore
      setSavedIdeas((prev) => prev.filter((i) => i.id !== id));

      await updateDoc(userRef, {
        savedIdeas: arrayRemove(idea),
      });
    } else {
      // ✅ Add to savedIdeas in state + Firestore
      const updatedIdea = { ...idea, saved: true };

      setSavedIdeas((prev) => [...prev, updatedIdea]);

      await updateDoc(userRef, {
        savedIdeas: arrayUnion(updatedIdea),
      });
    }
  };

  useEffect(() => {
    const fetchSavedIdeas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "savedIdeas"));
        const ideas: Idea[] = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore generates string IDs
          ...doc.data(),
        })) as unknown as Idea[];
        setSavedIdeas(ideas);
      } catch (error) {
        console.error("Error fetching saved ideas: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedIdeas();
  }, []);

  if (loading) return <p>Loading saved ideas...</p>;

  // // we load the savedIdeas on login
  // useEffect(() => {
  //   const user = auth.currentUser;
  //   if (!user) return;

  //   const userRef = doc(db, "users", user.uid);

  //   const unsubscribe = onSnapshot(userRef, (docSnap) => {
  //     if (docSnap.exists()) {
  //       const data = docSnap.data();
  //       if (data.savedIdeas) {
  //         setSavedIdeas(data.savedIdeas);
  //       }
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

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
