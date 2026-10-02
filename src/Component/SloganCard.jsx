import React, { useState } from "react";
import "./SloganCard.css";

const slogans = [
  {
    text: "TRACK SMART. SAVE MORE.",
    color: "yellow",
    icon: "↗",
  },
  {
    text: "EVERY RUPEE COUNTS.",
    color: "green",
    icon: "₹",
  },
  {
    text: "KNOW WHERE YOUR MONEY GOES.",
    color: "blue",
    icon: "◉",
  },
  {
    text: "SMALL SAVINGS. BIG RESULTS.",
    color: "red",
    icon: "★",
  },
  {
    text: "SPEND WITH PURPOSE.",
    color: "yellow",
    icon: "→",
  },
  {
    text: "YOUR MONEY. YOUR PLAN.",
    color: "green",
    icon: "✓",
  },
  {
    text: "MAKE EVERY EXPENSE COUNT.",
    color: "blue",
    icon: "↗",
  },
  {
    text: "BUILD BETTER MONEY HABITS.",
    color: "red",
    icon: "+",
  },
  {
    text: "TRACK IT. UNDERSTAND IT. CONTROL IT.",
    color: "yellow",
    icon: "◎",
  },
  {
    text: "SAVE TODAY. ENJOY TOMORROW.",
    color: "green",
    icon: "→",
  },
];

function SloganCard() {
  const [slogan] = useState(() => {
    const randomIndex = Math.floor(Math.random() * slogans.length);
    return slogans[randomIndex];
  });

  return (
    <div className={`slogan-card ${slogan.color}`}>
      <div className="slogan-top">
        <span className="slogan-label">
          <div>MONEY THOUGHT</div>
        </span>

        <span className="slogan-icon">
          {slogan.icon}
        </span>
      </div>

      <h3>{slogan.text}</h3>

      <div className="slogan-decoration">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default SloganCard;