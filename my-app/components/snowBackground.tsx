"use client";

const snowflakes = Array.from({ length: 50 });

export default function SnowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((_, index) => (
        <span
          key={index}
          className="snowflake"
          style={{
            left: `${(index * 37) % 100}%`,
            animationDelay: `${(index % 10) * -1}s`,
            animationDuration: `${6 + (index % 6)}s`,
            fontSize: `${12 + (index % 14)}px`,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}