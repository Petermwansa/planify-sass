// app/saved/page.tsx
"use client";

import { useState } from "react";
import { dummyIdeas } from "@/data/dummyIdeas";
import { Idea } from "@/types/Idea";
import SavedIdeasOnly from "@/components/SavedIdeas";


const SavedIdeasPage = () => {
  const [ideas, setIdeas] = useState<Idea[]>(dummyIdeas);

  const toggleSaved = (id: string) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, saved: !idea.saved } : idea
      )
    );
  };

  return (
    <div className="content_ideas">
      <h1>Saved Ideas</h1>
        <SavedIdeasOnly ideas={ideas} onToggleSaved={toggleSaved} />
      </div>
  )
};

export default SavedIdeasPage;



