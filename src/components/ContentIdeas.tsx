import { Bookmark, Copy } from "lucide-react"; // Lucide save icon

import { dummyIdeas } from "@/data/dummyIdeas";

const ContentIdeas = () => {
  return (
    <div className="content_ideas">
      <h1>Generated Ideas based on your search</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {dummyIdeas.map((idea) => (
          <div key={idea.id} className="idea_card">
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
            <h2 className=" text-black">📝{idea.type}</h2>
            <hr />

            <h2 className="idea_card_section_header">Hashtags</h2>
            <div className="text-xs text-blue-600">
              {idea.hashtags.map((tag, i) => (
                <h2 key={i} className="mr-1">
                  #{tag.replace("#", "")}
                </h2>
              ))}
            </div>
            <hr />
            <div className="mt-2 text-s text-gray-500">
              Created: {new Date(idea.createdAt).toLocaleDateString()}
            </div>
            <div className="flex justify-between"></div>
            <div className="flex justify-between">
              <button className="idea_button">
                <Bookmark className="w-4 h-6" />
                <p>Save</p>
              </button>
              <button className="idea_button">
                <Copy className="w-4 h-6" />
                <p>Copy </p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentIdeas;
