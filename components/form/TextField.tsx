"use client";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  errorMsg?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  errorMsg: error,
}) => {
  return (
    <div className="flex flex-col w-full gap-y-[9px]">
      <div className="flex text-[12px] justify-between max-h-fit text-center">
        <label className="font-semibold text-gray-700">{label}</label>

        {/* for error message */}
        {error && <p className="text-error text-sm">{error}</p>}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-6 py-[18px] border font-bold text-[14px] border-gray-300 rounded-md focus:outline-none focus:border focus:border-primary caret-primary invalid:border-error invalid:focus:border-error"
      />
    </div>
  );
};

export default TextField;
