import Button from "@/components/button";

const page = () => {
  return (
    <div className="flex flex-col gap-2 p-7">
      Testing buttons
      <Button>See product</Button>
      <Button variant="outlined">See product</Button>
      <Button variant="text-icon">Shop</Button>
    </div>
  );
};

export default page;
