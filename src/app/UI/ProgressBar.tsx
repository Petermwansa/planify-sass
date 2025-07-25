// components/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress_bar_container">
      <div
        className="progress_bar_inner"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
