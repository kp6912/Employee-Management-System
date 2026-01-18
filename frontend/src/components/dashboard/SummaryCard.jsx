import React from "react";

const SummaryCard = ({ icon, text, number, bgColor = "bg-teal-700" }) => {
  return (
    <div
      className={`${bgColor} text-white rounded-xl shadow-md p-5 flex items-center gap-4 transition transform hover:scale-105`}
    >
      {/* Icon */}
      <div className="text-3xl">
        {icon}
      </div>

      {/* Text & Number */}
      <div>
        <p className="text-sm text-teal-200">{text}</p>
        <p className="text-2xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
