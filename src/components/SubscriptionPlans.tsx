import React from "react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0/month",
    description: "Perfect for getting started with basic content tools.",
    features: ["5 AI content ideas/month", "Basic support", "Limited access"],
    buttonText: "Use Free Plan",
  },
  {
    id: "pro",
    name: "Professional",
    price: "$19/month",
    description: "Best for growing creators with more needs.",
    features: ["50 AI content ideas/month", "Priority support", "Analytics tools"],
    buttonText: "Upgrade to Pro",
  },
  {
    id: "premium",
    name: "Premium",
    price: "$49/month",
    description: "For serious creators & agencies with high demands.",
    features: ["Unlimited AI content", "Dedicated support", "Team access"],
    buttonText: "Upgrade to Premium",
  },
];

const SubscriptionPlans = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">💳 Manage Subscription Plan</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
            <p className="text-gray-500 mb-2">{plan.description}</p>
            <p className="text-lg font-bold text-blue-600 mb-4">{plan.price}</p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              {plan.features.map((feature, idx) => (
                <li key={idx}>✔ {feature}</li>
              ))}
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
