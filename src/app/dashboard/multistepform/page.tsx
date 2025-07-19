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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    console.log("Submitting:", formData);
    // Call MongoDB / API here
    alert("Form submitted!");
    setStep(1);
    setFormData({
      topic: "",
      category: "",
      description: "",
      platform: "",
    });
  };

  return (
    <div className="">
      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Step 1: Idea Basics</h2>
          <input
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Idea Title"
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (e.g., Growth, Tips)"
            className="w-full mb-3 p-2 border rounded"
          />
          <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Step 2: Description</h2>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short Description"
            className="w-full mb-3 p-2 border rounded"
          />
          <div className="flex justify-between">
            <button onClick={prevStep} className="px-4 py-2 border rounded">
              Back
            </button>
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Step 3: Platform</h2>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="">Choose Platform</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="TikTok">FaceBook</option>
          </select>
          <div className="flex justify-between">
            <button onClick={prevStep} className="px-4 py-2 border rounded">
              Back
            </button>
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiStepForm;
