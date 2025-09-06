import IdeaCard from "@/app/UI/Card/IdeaCard";
import { Idea } from "@/types/Idea";
import Start from "./Start";
// import { dummyIdeas } from "@/data/dummyIdeas";

type ContentIdeasProps = {
  ideas: Idea[];
  toggleSaved: (id: number) => void;
  setActiveView: (view: string) => void; // pass down for Start
};

const ContentIdeas = ({ ideas, toggleSaved, setActiveView }: ContentIdeasProps) => {
  if (ideas.length === 0) {
    return <Start setActiveView={setActiveView} />;
  }
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
