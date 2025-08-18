import { useState } from "react";
import IdeaCard from "@/app/UI/Card/IdeaCard";
import { Idea } from "@/types/Idea";

const ContentIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: "Web Development",
          category: "Tech",
          description: "Helping beginners learn coding in a fun way",
          platform: "Instagram",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch ideas");
      }

      const data = await res.json();
      setIdeas(data.ideas); // ✅ API returns ideas in correct format
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleSaved = (id: number) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === id ? { ...idea, saved: !idea.saved } : idea
      )
    );
  };

  return (
    <div className="content_ideas">
      <h1>Generated Ideas</h1>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md mt-4"
        onClick={fetchIdeas}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Ideas"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mt-6">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} onToggleSaved={toggleSaved} />
        ))}
      </div>
    </div>
  );
};

export default ContentIdeas;
