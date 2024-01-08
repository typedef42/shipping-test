import twMerge from "@/utils/twMerge";
import React from "react";

interface OptionSelectProps {
  value: string;
  options: Array<string>;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

const OptionSelect: React.FC<OptionSelectProps> = ({ value, options, onChange, className, label }) => (
  <div className={twMerge("mb-4 !relative inline-flex", className)}>
    <select
      className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-blue-100 hover:border-gray-400 focus:outline-none appearance-none w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default OptionSelect;
