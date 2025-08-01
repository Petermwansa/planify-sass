import { useState } from "react";
import Profile from "./Profile";
import Usage from "./Usage";
import Billing from "./Billing";

const ControlPanel = () => {
  const [activeView, setActiveView] = useState("profile");

  const renderView = () => {
    switch (activeView) {
      case "profile":
        return <Profile />;
      case "usage":
        return <Usage />;
      case "billing":
        return <Billing />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="settings_container">
      <div className="control_panel_top">
        <div className="control_panel">
          <h1>Control Panel</h1>
          <div className="control_panel_links">
            <button
              onClick={() => setActiveView("profile")}
              className={` ${
                activeView === "profile"
                  ? "control_panel_link_active"
                  : "control_panel_link"
              }`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveView("usage")}
              className={`${
                activeView === "usage"
                  ? "control_panel_link_active"
                  : "control_panel_link"
              }`}
            >
              Usage
            </button>
            <button
              onClick={() => setActiveView("billing")}
              className={` ${
                activeView === "billing"
                  ? "control_panel_link_active"
                  : "control_panel_link"
              }`}
            >
              Billing
            </button>
          </div>
        </div>
      </div>
      <div className="control_panel_bottom">{renderView()}</div>
    </div>
  );
};

export default ControlPanel;
