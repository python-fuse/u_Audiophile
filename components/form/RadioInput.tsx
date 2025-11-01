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
    <div className="flex px-3 py-2 w-[309px] max-h-[81px] rounded items-center justify-start border border-primary">
      <input
        type="radio"
        name={label}
        id={id}
        checked={isActive}
        onChange={onSelect}
        className="accent-primary"
      />

      <label htmlFor={id} className=" text-black font-bold text-[14px] ml-4">
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
