import { useState, useEffect } from "react";
import IdeaCard from "@/app/UI/Card/IdeaCard";
import { Idea } from "@/types/Idea";

type ContentIdeasProps = {
  ideas: Idea[];
};

const ContentIdeas = ({ ideas }: ContentIdeasProps) => {
  const [localIdeas, setLocalIdeas] = useState<Idea[]>(ideas || []);


  const toggleSaved = (id: number) => {
    setLocalIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === id ? { ...idea, saved: !idea.saved } : idea
      )
    );
  };

  return (
    <div className="content_ideas">
      <h1>Generated Ideas based on your search</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {localIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} onToggleSaved={toggleSaved} />
        ))}
      </div>
    </div>
  );
};

export default ContentIdeas;
