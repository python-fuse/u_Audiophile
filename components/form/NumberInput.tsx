import React from "react";

interface NumberInputProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min,
  max,
}) => {
  return (
    <div className="flex bg-light text-[13px] text-black/25 items-center justify-between  w-[120px] h-12 px-4">
      <button
        className="hover:text-primary"
        onClick={() => onChange(Math.max(min ?? 1, value - 1))}
      >
        &minus;
      </button>
      <span className="text-black font-bold">{value}</span>
      <button
        className="hover:text-primary"
        onClick={() => onChange(Math.min(max ?? Infinity, value + 1))}
      >
        &#43;
      </button>
    </div>
  );
};

export default NumberInput;
