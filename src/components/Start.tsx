interface SidebarProps {
  setActiveView: (view: string) => void;
}

const Start: React.FC<SidebarProps> = ({ setActiveView }) => {
  const name = "Peter";
  return (
    <div className="start">
      <h1 className="start-name">Hey {name}</h1>
      <p className="start-p">Welcome to your AI Content creation assistant</p>
      <button onClick={() => setActiveView("multistepform")}className="generate-btn">
        + New Idea
      </button>
    </div>
  );
};

export default Start;
