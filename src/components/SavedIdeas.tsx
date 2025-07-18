import React from "react";

interface Idea {
  id: number;
  title: string;
  dateSaved: string;
}

const savedIdeas: Idea[] = [
  {
    id: 1,
    title: "5 AI tools every content creator should try",
    dateSaved: "2025-07-16",
  },
  {
    id: 2,
    title: "How to generate a month of content in one hour",
    dateSaved: "2025-07-15",
  },
  {
    id: 3,
    title: "The future of content creation with generative AI",
    dateSaved: "2025-07-14",
  },
];

const SavedIdeas: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">💾 Saved Ideas</h2>

      {savedIdeas.length === 0 ? (
        <p className="text-gray-500">You haven’t saved any ideas yet.</p>
      ) : (
        <ul className="grid gap-4">
          {savedIdeas.map((idea) => (
            <li
              key={idea.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-medium">{idea.title}</h3>
              <p className="text-sm text-gray-400">
                Saved on {idea.dateSaved}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedIdeas;