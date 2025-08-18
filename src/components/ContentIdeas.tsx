import { useState, useEffect } from "react";
import IdeaCard from "@/app/UI/Card/IdeaCard";
import { Idea } from "@/types/Idea";

const ContentIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: "AI in Marketing",
          category: "Tech",
          description: "Trends and strategies",
          platform: "Instagram",
        }),
      });

      const data = await res.json();
      setIdeas(data.ideas || []);
    };

    fetchIdeas();
  }, []);

  const toggleSaved = (id: number) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === id ? { ...idea, saved: !idea.saved } : idea
      )
    );
  };

  return (
    <div className="content_ideas">
      <h1>Generated Ideas based on your search</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} onToggleSaved={toggleSaved} />
        ))}
      </div>
    </div>
  );
};

export default ContentIdeas;
