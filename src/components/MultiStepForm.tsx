"use client";

import React, { useState } from "react";

type FormData = {
  topic: string;
  category: string;
  description: string;
  platform: string;
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    topic: "",
    category: "",
    description: "",
    platform: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

const handleSubmit = async () => {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("AI Ideas:", data.ideas);
    alert("AI Generated Ideas:\n" + data.ideas);
  } catch (error) {
    console.error("Failed to generate ideas:", error);
  }
};

  return (
    <div className="multi-step-form">
      {step === 1 && (
        <div className="entry">
          <h2 className="entry_title">Enter a Topic / Niche</h2>
          <input
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Idea Title"
            className="entry_input"
          />
          <button onClick={nextStep} className="entry_button">
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="entry">
          <h2 className="entry_title">Enter a Category</h2>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (e.g., Growth, Tips)"
            className="entry_input"
          />
          <div className="entry_button_group">
            <button onClick={prevStep} className="entry_button">
              Back
            </button>
            <button className="entry_button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="entry">
          <h2 className="entry_title">Enter the Description</h2>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short Description"
            className="entry_input"
          />
          <div className="flex justify-between">
            <button onClick={prevStep} className="entry_button">
              Back
            </button>
            <button onClick={nextStep} className="entry_button">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="entry">
          <h2 className="entry_title">Choose the Platform</h2>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="entry_input"
          >
            <option value="">Choose Platform</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Facebook">FaceBook</option>
          </select>
          <div className="entry_button_group">
            <button onClick={prevStep} className="entry_button">
              Back
            </button>
            <button onClick={handleSubmit} className="entry_button">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
