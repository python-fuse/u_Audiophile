interface RadioInputProps {
  id: string;
  isActive: boolean;
  label: string;
  onSelect: () => void;
}

import React from "react";

const RadioInput: React.FC<RadioInputProps> = ({
  id,
  isActive,
  label,
  onSelect,
}) => {
  return (
    <div className="flex px-4 py-[18px] w-full rounded-lg items-center justify-start border border-gray-300 hover:border-primary focus-within:border-primary transition-colors">
      <input
        type="radio"
        name={label}
        id={id}
        checked={isActive}
        onChange={onSelect}
        className="accent-primary w-5 h-5"
      />

      <label
        htmlFor={id}
        className=" text-black font-bold text-[14px] ml-4 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
