import useFormData from "../../hooks/useForm";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { IUser, UserRegisterData } from "../../Interfaces/User.interface";

import { InputGroup } from "../../Components/InputGroup";
import { Button } from "../../Components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { register } from "../../api/requests";
import { toast } from "../../Components/ui/Toast/use-toast";

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
      toast({ title: errorMessagesText.missingFields, variant: "destructive"});
      return;
    }

    if (authData.password !== authData.rePassword) {
      toast({ title: errorMessagesText.passwordDismatch, variant: "destructive"});
      return;
    }

    const response = await register(authData);

    signUser(response);
    navigate("/dashboard");
  };

  return (
    <div className="w-2/5 m-auto absolute top-[30%] left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col gap-4">
      <h2 className="text-center text-2xl">
        Sign up as{" "}
        <span className="text-[#4F6F52] font-semibold">
          {option && option.charAt(0).toUpperCase() + option.slice(1)}
        </span>
      </h2>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
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
  );
};
