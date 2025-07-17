import GenerateBtn from "@/app/UI/Button/GenerateBtn";

const Start = () => {
  const name = "Peter";
  return (
    <div className="start">
      <h1 className="start-name">Hey {name}</h1>
      <p className="start-p">Welcome to your AI Content creation assistant</p>
      <GenerateBtn />
    </div>
  );
};

export default Start;
