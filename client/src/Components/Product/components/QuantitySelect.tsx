import { Dispatch, SetStateAction } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Minus, Plus } from "lucide-react";

export const QuantitySelect = ({
  setQuantity,
  quantity,
  asCard,
}: {
  setQuantity: Dispatch<SetStateAction<number>>;
  quantity: number;
  asCard?: boolean;
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
    <div className={`w-fit flex gap-1 ${asCard ? "m-auto justify-center" : ""}`}>
      <Button size="icon" variant={"secondary"} onClick={handleDecrement}>
        <Minus />
      </Button>

      <Input
        type="number"
        className="w-1/2"
        value={quantity}
        onChange={handleChange}
      />

      <Button size="icon" variant={"secondary"} onClick={handleIncrement}>
        <Plus />
      </Button>
    </div>
  );
};
