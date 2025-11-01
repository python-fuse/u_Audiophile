"use client";

import Button from "@/components/button";
import NumberInput from "@/components/form/NumberInput";
import RadioInput from "@/components/form/RadioInput";
import TextField from "@/components/form/TextField";

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-2 p-7">
        Testing buttons
        <Button>See product</Button>
        <Button variant="outlined">See product</Button>
        <Button variant="text-icon">Shop</Button>
      </div>

      <div className="flex flex-col gap-y-4 p-7">
        Testing form fields
        <TextField label="Name" value="Umar" onChange={() => {}} />
        <RadioInput
          id="option1"
          isActive={true}
          label="Option 1"
          onSelect={() => {}}
        />
        <RadioInput
          id="option1"
          isActive={false}
          label="Option 1"
          onSelect={() => {}}
        />
        <NumberInput value={2} onChange={() => {}} min={1} max={5} />
      </div>
    </>
  );
};

export default page;
