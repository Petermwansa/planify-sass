// components/SavedIdeasOnly.tsx

import React from "react";
import { Idea } from "@/types/Idea";
import IdeaCard from "@/app/UI/Card/IdeaCard";

type SavedIdeasProps = {
  savedIdeas: Idea[];
  toggleSaved: (id: number) => void;
};

const SavedIdeasOnly  = ({ savedIdeas, toggleSaved }: SavedIdeasProps) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {savedIdeas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onToggleSaved={toggleSaved} />
      ))}
    </div>
  );
};

export default SavedIdeasOnly;
