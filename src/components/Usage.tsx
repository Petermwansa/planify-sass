import ProgressBar from "@/app/UI/ProgressBar";

export default function Usage() {
  return (
    <div className="usage">
      <p className="usage_text">
        You have used 50% of the available generate tokens. 
      </p>

      <ProgressBar progress={50} />
      <p className="progress">50%</p>

      <p className="usage_text_bottom">
        Upgrade to Premium Plan to get unlimited token
      </p>
    </div>
  );
}
