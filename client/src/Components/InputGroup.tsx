import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { IUser } from "../Interfaces/User.interface";
import { ProductMutableData } from "../Interfaces/Product.interface";
import { cn } from "../lib/utils";

export const InputGroup = ({
  label,
  placeHolder,
  value,
  onChange,
  id,
  type,
  className,
  multiple,
}: {
  label: string;
  placeHolder: string | undefined;
  value?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: keyof IUser | keyof ProductMutableData;
  type?: string;
  className?: string;
  multiple?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Input
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        className={`${!value ? "bg-muted" : ""} ${className}`}
        id={id}
        type={type || "text"}
        multiple
      />
    </div>
  );
};
