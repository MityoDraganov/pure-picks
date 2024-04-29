import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { IUser } from "../Interfaces/User.interface";

export const InputGroup = ({
    label,
    placeHolder,
    value,
    onChange,
    id,
}: {
    label: string;
    placeHolder: string | undefined;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: keyof IUser
}) => {
    return(
        <div className="flex flex-col gap-1">
            <Label>{label}</Label>
            <Input placeholder={placeHolder} value={value} onChange={onChange} className="bg-muted" id={id}></Input>
        </div>
    )
}