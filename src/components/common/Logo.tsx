import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 24 }) => {
  return (
    <div
      className={`rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0 ${className}`}
      style={{ width: size + 16, height: size + 16 }}
    >
      <img
        src="/assets/aistudio/streamline--quality-education-solid_f7fc134b.svg"
        alt="Tense Master Logo"
        style={{ width: size, height: size }}
        className="filter brightness-0 invert"
      />
    </div>
  );
};
