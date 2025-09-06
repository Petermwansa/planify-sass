import React from "react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with basic content tools.",
    features: [
      "24 AI content idea generations per month",
      "Limited access to your saved Ideas",
    ],
    buttonText: "Purchase",
  },
  {
    id: "creator",
    name: "Creator Pack",
    price: "$50",
    description: "Best for growing creators who want to create.",
    features: [
      "120 AI content idea generations per month",
      "Limited access to your saved Ideas",
    ],
    buttonText: "Purchase",
  },
  {
    id: "agency",
    name: "Agency",
    price: "$250",
    description: "Best for growing creators with more needs.",
    features: [
      "12 000 AI content idea generations per month",
      "Limited access to your saved Ideas",
    ],
    buttonText: "Pro",
  }
];

const SubscriptionPlans = () => {
  return (
    <div className="plans">
      <h2 className="heading">Pricing Plans</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition"
          >
            <h3 className="plan_name">{plan.name}</h3>
            <p className="plan_description">{plan.description}</p>
            <p className="plan_price">
              {plan.price}/<span>month</span>
            </p>
            <ul className="plan_features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>✔ {feature}</li>
              ))}
            </ul>
            <button className="upgrade-button plan_upgrade">
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
