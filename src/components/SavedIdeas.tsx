// components/SavedIdeasOnly.tsx

import React from "react";
import { Idea } from "@/types/Idea";
import IdeaCard from "@/app/UI/Card/IdeaCard";

type SavedIdeasOnlyProps = {
  ideas: Idea[];
  onToggleSaved: (id: string) => void;
};

const SavedIdeasOnly: React.FC<SavedIdeasOnlyProps> = ({ ideas, onToggleSaved }) => {
  const savedIdeas = ideas.filter((idea) => idea.saved);

  if (savedIdeas.length === 0) {
    return <p className="text-center text-gray-500">No saved ideas yet.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {savedIdeas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onToggleSaved={onToggleSaved} />
      ))}
    </div>
  );
};

export default SavedIdeasOnly;
