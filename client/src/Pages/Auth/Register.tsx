import useFormData from "../../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserRegisterData } from "../../Interfaces/User.interface";

import { InputGroup } from "../../Components/InputGroup";
import { Button } from "../../Components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { register } from "../../api/requests";
import { toast } from "../../Components/ui/Toast/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../Components/ui/select";

export const Register = () => {
    const errorMessagesText = {
        passwordDismatch: "Passwords do not match!",
        missingFields: "All fields required!",
    };

    const navigate = useNavigate();
    const { option } = useParams<{ option: string }>();
    const { signUser } = useContext(AuthContext);

    const [authData, handleInputChange] = useFormData<UserRegisterData>({
        username: "",
        email: "",
        password: "",
        rePassword: "",
        type: option || "buyer",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (Object.values(authData).some((x) => !x)) {
            toast({
                title: errorMessagesText.missingFields,
                variant: "destructive",
            });
            return;
        }

        if (authData.password !== authData.rePassword) {
            toast({
                title: errorMessagesText.passwordDismatch,
                variant: "destructive",
            });
            return;
        }

        const response = await register(authData);

        signUser(response);
        navigate("/dashboard");
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-2/5 flex flex-col">
                <div className="flex items-center justify-center gap-2 m-auto text-2xl">
                    <p className="w-fit">Sign up as</p>
                    <Select
                        onValueChange={(value) =>
                            handleInputChange({ id: "type", value: value })
                        }
                    >
                        <SelectTrigger
                            className={`w-fit text-[#4F6F52] text-2xl font-semibold outline-none border-0 cursor-pointer bg-transparent`}
                        >
                            <SelectValue
                                placeholder={
                                    option &&
                                    option.charAt(0).toUpperCase() +
                                        option.slice(1)
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="buyer">
                                <p className="w-full flex flex-row gap-2">
                                    Buyer
                                </p>
                            </SelectItem>
                            <SelectItem value="deliverer">
                                <p className="w-full flex flex-row gap-2">
                                    Deliverer
                                </p>
                            </SelectItem>
                            <SelectItem value="farmer">
                                <p className="w-full flex flex-row gap-2">
                                    Farmer
                                </p>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <InputGroup
                        label="Username"
                        placeHolder=""
                        value={authData.username}
                        onChange={handleInputChange}
                        id="username"
                    />

                    <InputGroup
                        label="Email"
                        placeHolder=""
                        value={authData.email}
                        onChange={handleInputChange}
                        id="email"
                        type="email"
                    />

                    <InputGroup
                        label="Password"
                        placeHolder=""
                        value={authData.password}
                        onChange={handleInputChange}
                        id="password"
                        type="password"
                    />

                    <InputGroup
                        label="Confirm password"
                        placeHolder=""
                        value={authData.rePassword}
                        onChange={handleInputChange}
                        id="rePassword"
                        type="password"
                    />

                    <div className="flex justify-between px-4">
                        <Link
                            to="/auth/login"
                            className="hover:underline underline-offset-4 w-fit"
                        >
                            Already have an account?
                        </Link>
                    </div>

                    <Button className="text-md">Sign up</Button>
                </form>
            </div>
        </div>
    );
};
