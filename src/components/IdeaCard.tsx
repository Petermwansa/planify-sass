import React from "react";
import { Bookmark, BookmarkCheck, Copy } from "lucide-react";
import { Idea } from "@/types/Idea";

type IdeaCardProps = {
  idea: Idea;
  onToggleSaved: (id: string) => void;
};

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onToggleSaved }) => {
  return (
    <div className="idea_card">
      <h2 className="idea_card_section_header">Hook</h2>
      <h2 className="text-lg font-bold text-black">{idea.hook}</h2>
      <hr />

      <h2 className="idea_card_section_header">Idea</h2>
      <p className="text-black mt-1">{idea.idea}</p>
      <hr />

      <h2 className="idea_card_section_header">Platform</h2>
      <h2 className="text-lg font-bold text-black">📍{idea.platform}</h2>
      <hr />

      <h2 className="idea_card_section_header">Goal</h2>
      <h2 className="text-lg font-bold text-black">🎯 {idea.goal}</h2>
      <hr />

      <h2 className="idea_card_section_header">Content Type</h2>
      <h2 className="text-black">📝{idea.type}</h2>
      <hr />

      <h2 className="idea_card_section_header">Hashtags</h2>
      <div className="text-xs text-blue-600">
        {idea.hashtags.map((tag, i) => (
          <h2 key={i} className="mr-1">#{tag.replace("#", "")}</h2>
        ))}
      </div>
      <hr />

      <div className="mt-2 text-s text-gray-500">
        Created: {new Date(idea.createdAt).toLocaleDateString()}
      </div>

      <div className="flex justify-between mt-2">
        <button className="idea_button" onClick={() => onToggleSaved(idea.id)}>
          {idea.saved ? (
            <>
              <BookmarkCheck className="w-4 h-6 text-green-600" />
              <p>Saved</p>
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-6" />
              <p>Save</p>
            </>
          )}
        </button>

        <button className="idea_button">
          <Copy className="w-4 h-6" />
          <p>Copy</p>
        </button>
      </div>
    </div>
  );
};

export default IdeaCard;
