import React from "react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with basic content tools.",
    features: ["5 AI content ideas/month", "Basic support", "Limited access"],
    buttonText: "Free ",
  },
  {
    id: "starter",
    name: "Starter",
    price: "$25",
    description: "Best for growing creators with more needs.",
    features: [
      "50 AI content ideas/month",
      "Priority support",
      "Analytics tools",
    ],
    buttonText: "Starter",
  },
  {
    id: "pro",
    name: "Professional",
    price: "$100",
    description: "Best for growing creators with more needs.",
    features: [
      "50 AI content ideas/month",
      "Priority support",
      "Analytics tools",
    ],
    buttonText: "Pro",
  },
  {
    id: "agency",
    name: "Agency",
    price: "$250",
    description: "For serious creators & agencies with high demands.",
    features: ["Unlimited AI content", "Dedicated support", "Team access"],
    buttonText: "Agency",
  },
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
