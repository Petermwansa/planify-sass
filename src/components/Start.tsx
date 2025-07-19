import Link from "next/link";

const Start = () => {
  const name = "Peter";
  return (
    <div className="start">
      <h1 className="start-name">Hey {name}</h1>
      <p className="start-p">Welcome to your AI Content creation assistant</p>
      <Link href={"/dashboard/multistepform"} className="generate-btn">
        + New Idea
      </Link>
    </div>
  );
};

export default Start;
