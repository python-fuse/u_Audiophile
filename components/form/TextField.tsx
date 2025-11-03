"use client";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  errorMsg?: string;
  placeholder?: string;
  onBlur?: () => void;
  type?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  errorMsg: error,
  placeholder,
  onBlur,
  type = "text",
}) => {
  return (
    <div className="flex flex-col w-full gap-y-[9px]">
      <div className="flex text-[12px] justify-between max-h-fit text-center">
        <label className="font-bold text-sm text-gray-700">{label}</label>

        {/* for error message */}
        {error && <span className="text-error text-sm font-bold">{error}</span>}
      </div>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`px-6 py-[18px] border font-bold text-[14px] rounded-md focus:outline-none focus:border-2 caret-primary ${
          error
            ? "border-error focus:border-error"
            : "border-gray-300 focus:border-primary"
        }`}
      />
    </div>
  );
};

export default TextField;
