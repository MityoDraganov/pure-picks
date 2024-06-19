import { IMarketplaceSettingsDto, IUser } from "../Interfaces/User.interface";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
  absoluteLabel
}: {
  label: string;
  placeHolder: string | undefined;
  value?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: any;
  type?: string;
  className?: string;
  multiple?: boolean;
  absoluteLabel?: boolean;
}) => {
  return (
    <div className={`flex flex-col gap-1 relative ${className}`}>
      <Label className={`${absoluteLabel ? "absolute -top-4" : ""}`}>{label}</Label>
      <Input
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        className={`${!value ? "bg-muted" : ""} w-full`}
        id={id}
        type={type || "text"}
        multiple
      />
    </div>
  );
};
