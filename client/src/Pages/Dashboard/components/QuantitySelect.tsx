import { Dispatch, SetStateAction } from "react";
import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/input";
import { Minus, Plus } from "lucide-react";

export const QuantitySelect = ({
  setQuantity,
  quantity,
}: {
  setQuantity: Dispatch<SetStateAction<number>>;
  quantity: number;
}) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setQuantity(newValue);
    }
  };

  return (
    <div className="flex gap-1">
      <Button size="icon" variant={"secondary"} onClick={handleDecrement}>
        <Minus />
      </Button>

      <Input
        type="number"
        className="w-fit"
        value={quantity}
        onChange={handleChange}
      />

      <Button size="icon" variant={"secondary"} onClick={handleIncrement}>
        <Plus />
      </Button>
    </div>
  );
};
