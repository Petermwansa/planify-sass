import GenerateBtn from "@/app/UI/Button/GenerateBtn";

const Start = () => {
  const name = "Peter";
  function setActiveView(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="start">
      <h1 className="start-name">Hey {name}</h1>
      <p className="start-p">Welcome to your AI Content creation assistant</p>
        <GenerateBtn onClick={() => setActiveView("subscription")} />
    </div>
  );
};

export default Start;
